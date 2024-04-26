using ExamService.Data.Entities;
using ExamService.Infrastructure.Interfaces;
using ExamService.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace ExamService.Service.Services;

public class ModuleService : IModuleService
{
    #region Fields 
    private readonly IStudentQuizzesRepository _studentQuizzesRepository;
    private readonly IModuleRepository _moduleRepository;
    private readonly IDistributedCache _cache;
    private readonly SemaphoreSlim _asyncLock = new SemaphoreSlim(1, 1); // Initialize with initial request count 1 and maximum request count 1
    #endregion
    #region Constructors 
    public ModuleService(IStudentQuizzesRepository studentQuizzesRepository, IModuleRepository moduleRepository,IDistributedCache cache)
    {
        _moduleRepository = moduleRepository;
        _cache = cache;
        _studentQuizzesRepository=studentQuizzesRepository;
    }


    #endregion
    #region Methods

    public async Task<List<Module>> GenerateModules(List<Question> quizQuestions, int numberOfModules, int numberOfQuestionsPerModule, Guid courseId, Guid instructorId)
    {
        if (quizQuestions == null || quizQuestions.Count == 0 || numberOfModules <= 0 || numberOfQuestionsPerModule <= 0)
            throw new ArgumentException("Invalid input parameters");
        
        // Shuffle the questions
        Random rng = new Random();
        List<Question> shuffledQuestions = quizQuestions.OrderBy(q => rng.Next()).ToList();

        int totalQuestions = numberOfModules * numberOfQuestionsPerModule;
        if (totalQuestions > quizQuestions.Count)
            throw new ArgumentException("Not enough questions available for the given parameters");

        List<Module> modules = new List<Module>();
        for (int i = 0; i < numberOfModules; i++)
        {
            List<Question> moduleQuestions = shuffledQuestions.Skip(i * numberOfQuestionsPerModule).Take(numberOfQuestionsPerModule).ToList();

            decimal totalModuleGrade = moduleQuestions.Sum(q => q.Points);

            Module module = new Module
            {
                Name = $"Module {i + 1}",
                ModuleQuestions = moduleQuestions.Select(q => new ModuleQuestion
                {
                    QuestionId = q.Id,
                    Question = new Question
                    {
                        Id = q.Id,
                        Text = q.Text,
                        Points = q.Points,
                        Duration = q.Duration,
                        ImageLink = q.ImageLink,
                        CourseId= q.CourseId,
                        Options = q.Options.Select(opt => new Option
                        {
                            Id = opt.Id,
                            Text = opt.Text,
                            IsCorrect = opt.IsCorrect
                        }).ToList()
                    }
                }).ToList(),
                TotalGrade = totalModuleGrade

            };



            modules.Add(module);
        }

        try
        {
            // Serialize modules
            var serializedModules = JsonConvert.SerializeObject(modules);

            // Generate cache key based on courseId and instructorId
            var cacheKey = $"GeneratedModules:{courseId}:{instructorId}";
            
            // Acquire asynchronous lock before accessing/modifying cache
            await _asyncLock.WaitAsync();

            try
            {
                // Set the serialized modules in the cache
                await _cache.SetStringAsync(cacheKey, serializedModules);
            }
            finally
            {
                // Release the lock
                _asyncLock.Release();
            }

            return modules;
        }
        catch (Exception ex)
        {
            // Handle the exception (e.g., log the error)
            Console.WriteLine($"Error storing modules in Redis cache: {ex.Message}");
            throw;
        }
    }




    public async Task<Module?> GetModuleById(Guid moduleId)
    {
        return _moduleRepository.GetTableNoTracking()
                                      .Include(m => m.ModuleQuestions)
                                        .ThenInclude(mq => mq.Question)
                                        .ThenInclude(q => q.Options)
                                      .Where(m => m.Id == moduleId)
                                      .FirstOrDefault();
    }

    public async Task<List<Module>> GetModulesByQuizId(Guid quizId)
    {
        return await _moduleRepository.GetTableNoTracking()
                                  .Include(m => m.ModuleQuestions)
                                      .ThenInclude(mq => mq.Question) 
                                          .ThenInclude(q => q.Options)
                                  .Where(m => m.QuizId == quizId)
                                  .ToListAsync();
    }

    public async Task<List<Module>> SaveModules(List<Module> modules)
    {
        List<Module> addedModules = [];
        foreach (var module in modules)
        {
            _moduleRepository.DetachQuestions(module);
            addedModules.Add(await _moduleRepository.AddAsync(module));
        }
        return addedModules;
    }
    public async Task<int> AssignModulesToStudent(List<Module> quizModules, List<Student> students,Guid quizId)
    {
        var moduleIds = quizModules.Select(m => m.Id).ToList();
        // Shuffle the module IDs to randomize the assignment
        var random = new Random();
        var shuffledModuleIds = moduleIds.OrderBy(x => random.Next()).ToList();

        var studentModuleAssignments = new List<StudentQuizzes>();

        for (int i = 0; i < students.Count; i++)
        {
            // Assign modules to each student
            var assignment = new StudentQuizzes
            {
                StudentId = students[i].Id,
                QuizId = quizId,
                ModuleId = shuffledModuleIds[i % shuffledModuleIds.Count]
            };

            studentModuleAssignments.Add(assignment);
        }

        await _studentQuizzesRepository.AddRangeAsync(studentModuleAssignments);
        foreach(var module in quizModules)
        {
            module.AssignedCapacity= studentModuleAssignments.Count(a => a.ModuleId == module.Id);
            await _moduleRepository.UpdateAsync(module);
        }
        return studentModuleAssignments.Count;
    }

    public async Task<Module?> GetStudentModuleByQuizId(Guid quizId, Guid studentId)
    {
        string[] includes = { "Module" };
        var studentQuiz = _studentQuizzesRepository.GetTableNoTracking()
                                                   .Include(sq => sq.Module)
                                                    .ThenInclude(sm => sm.ModuleQuestions)
                                                     .ThenInclude(mq => mq.Question)
                                                      .ThenInclude(q => q.Options)
                                                   .SingleOrDefault(sq => (sq.QuizId == quizId && sq.StudentId == studentId));
                                                            
        return studentQuiz.Module;
    }

    #endregion


}
