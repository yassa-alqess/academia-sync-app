using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Modules.Commands.Models;
using ExamService.Data.Entities;
using ExamService.Service.Interfaces;
using MediatR;
using Microsoft.Identity.Client;

namespace ExamService.Core.Features.Modules.Commands.Handlers;

public class ModuleCommandHandles : ResponseHandler
                                  , IRequestHandler<GenerateQuizModulesCommandModel, Response<List<Module>>>
                                  , IRequestHandler<PublishModulesCommandModel, Response<string>>
                                  
{
    #region Fields
    private readonly IModuleService _moduleService;
    private readonly IQuestionService _questionService;
    private readonly IExcelProsessorService _excelProsessorService;
    private readonly IQuizService _quizService;
    private readonly IStudentService _studentService;
    private readonly IMapper _mapper;
    private readonly ISubmissionService _submissionService;
    #endregion
    #region Constructors
    public ModuleCommandHandles(ISubmissionService submissionService,IMapper mapper,IStudentService studentService
                               ,IQuizService quizService, IModuleService moduleService,IQuestionService questionService
                               ,IExcelProsessorService excelProsessorService)
    {
        _moduleService = moduleService;
        _questionService = questionService;
        _excelProsessorService = excelProsessorService;
        _quizService= quizService;
        _studentService = studentService;
        _mapper = mapper;
        _submissionService = submissionService;

    }
    #endregion
    #region Methods
    public async Task<Response<List<Module>>> Handle(GenerateQuizModulesCommandModel request, CancellationToken cancellationToken)
    {
        List<Question> questionsBank = [];
        List<Module> generatedModules;
        if (request.questionsSheet == null || request.questionsSheet.Length == 0)
        {
            questionsBank = await _questionService.GetAllQuestionsAsync(request.courseId);
            generatedModules = await _moduleService.GenerateModules(questionsBank, request.moduleNumbers, request.numberOfQuestionsPerModule,request.courseId,request.instructorId);
            return Success(generatedModules);
        }
        using var Stream=request.questionsSheet.OpenReadStream();
        var questions = _excelProsessorService.ProcessExcelData(Stream, request.courseId);
        if(questions != null)
        {
            foreach (var question in questions)
            {
                var existingQuestion = await _questionService.GetQuestionByName(question.Text,question.CourseId);
                if (existingQuestion is not null)
                    continue;
                questionsBank.Add(question);
            }
            if(questionsBank.Count==0)
            {
                foreach(var question in questions)
                {
                    var queryQuestion= await _questionService.GetQuestionByName(question.Text,question.CourseId);
                    questionsBank.Add(queryQuestion);
                }
                 
            }
        }
        else
        {
            return BadRequest(new List<Module>() ,"Something occurred while uploading questions sheet");
        }
        generatedModules = await _moduleService.GenerateModules(questionsBank, request.moduleNumbers, request.numberOfQuestionsPerModule, request.courseId, request.instructorId);
        return Success(generatedModules); 

    }

    public async Task<Response<string>> Handle(PublishModulesCommandModel request, CancellationToken cancellationToken)
    {

        var existingQuiz= await _quizService.GetQuizById(request.quizId);
        if (existingQuiz is null)
            return NotFound<string>("Quiz you are assign students to is not found");
        var quizModule = existingQuiz.Modules.ToList();
        int TotalQuizAssignment;
        List<Student> studentCourseList = [];
        //if the studentList is null then the user choose to complete auto 
        if (request.students is null || request.students.Count == 0)
        {

            studentCourseList = await _studentService.GetStudentListAsync(request.courseId);
            TotalQuizAssignment = await _moduleService.AssignModulesToStudent(quizModule, studentCourseList, request.quizId);
        }
        else
        {

            foreach (var student in request.students)
            {
                studentCourseList.Add(await _studentService.GetStudentByIdAsync(student.Id, request.courseId));
            }
            // else then the cilent need to assign this quiz to specific range of student to fo all student's course 
            TotalQuizAssignment = await _moduleService.AssignModulesToStudent(quizModule, studentCourseList, request.quizId);
        }
        existingQuiz.Capacity = TotalQuizAssignment;
        await _quizService.UpdateQuiz(existingQuiz);
        return Success($"Quiz {existingQuiz.Name} is successfully created");
    }

    



    #endregion


}
