using ExamService.Data.Entities;
using ExamService.Infrastructure.Interfaces;
using ExamService.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Service.Services;

public class QuizService : IQuizService
{

    #region Fields
    private readonly IQuizRepository _quizRepository;

    #endregion

    #region Constructors
    public QuizService(IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }
    #endregion

    #region Methods
    public async Task<Quiz?> CreateQuiz(Quiz quizData)
    {

        return await _quizRepository.AddAsync(quizData);
    }

    public async Task<List<Quiz>>? GetAllQuizzes(Guid instructorId, Guid courseId)
    {

        return _quizRepository.GetTableNoTracking()
                              .Include(q => q.Modules)
                                .ThenInclude(qm=>qm.ModuleQuestions)
                                    .ThenInclude(mq=>mq.Question)
                                        .ThenInclude(q=>q.Options)
                              .Where(q => (q.InstructorId == instructorId && q.CourseId == courseId))
                              .ToList();
    }

    public async Task<List<Quiz>> GetIncomingCourseQuizzes(Guid courseId)
    {
        string[] includes = { "Instructor" };
        var inquiredQuizzes = await _quizRepository.FindAll(q=>(q.CourseId== courseId&& q.StartedDate.ToLocalTime() >= DateTime.Now),includes);
        return inquiredQuizzes.ToList();
    }

    public async Task<Quiz?> GetQuizById(Guid quizId)
    {
        return _quizRepository.GetTableNoTracking()
                              .Include(q=>q.Instructor)
                              .Include(q => q.Modules)
                                .ThenInclude(qm => qm.ModuleQuestions)
                                    .ThenInclude(mq => mq.Question)
                                        .ThenInclude(q => q.Options)
                              .FirstOrDefault(q=>q.Id==quizId);
    }

    public async Task UpdateQuiz(Quiz updatedQuizData)
    {
         await _quizRepository.UpdateAsync(updatedQuizData);
    }
    #endregion

}
