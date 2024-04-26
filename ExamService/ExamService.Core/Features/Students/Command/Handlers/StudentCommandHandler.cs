using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Modules.Queries.Responses;
using ExamService.Core.Features.Students.Command.Models;
using ExamService.Core.Features.Students.Queries.Responses;
using ExamService.Data.Entities;
using ExamService.Service.Interfaces;
using ExamService.Service.Services;
using MediatR;

namespace ExamService.Core.Features.Students.Command.Handlers;

public class StudentCommandHandler:ResponseHandler
                                  ,IRequestHandler<EnrollToQuizCommandModel,Response<GetModuleByIdQueryResponse>>
                                  ,IRequestHandler<SubmitQuizAnswersCommandModel,Response<SubmitQuizQueryResponse>>
{
    private readonly IStudentService _studentService;
    private readonly IMapper _mapper;
    private readonly IModuleService _moduleService;
    private readonly IQuizService _quizService;
    private readonly ISubmissionService _submissionService;

    public StudentCommandHandler(ISubmissionService submissionService,IQuizService quizService,IStudentService studentService, IMapper mapper, IModuleService moduleService)
    {
        _studentService = studentService;
        _mapper = mapper;
        _moduleService = moduleService;
        _quizService = quizService;
        _submissionService= submissionService;
    }

    public async Task<Response<GetModuleByIdQueryResponse>> Handle(EnrollToQuizCommandModel request, CancellationToken cancellationToken)
    {
        var inquiredModule = await _moduleService.GetStudentModuleByQuizId(request.quizId, request.studentId);
        if (inquiredModule == null)
            return NotFound<GetModuleByIdQueryResponse>("Not Found module associated to you");
        var moduleMapped=_mapper.Map<GetModuleByIdQueryResponse>(inquiredModule);
        return Success(moduleMapped);
    }

    public async Task<Response<SubmitQuizQueryResponse>> Handle(SubmitQuizAnswersCommandModel request, CancellationToken cancellationToken)
    {
        var quizModule = await _quizService.GetQuizById(request.quizId);

        decimal proportionalFactor = (quizModule.Grade * request.TotalGrade);

        var moduleGrade = quizModule.Modules.FirstOrDefault(m => m.Id == request.moduleId).TotalGrade;

        request.TotalGrade = proportionalFactor / moduleGrade;

        var submission = _mapper.Map<Submission>(request);

        submission.IsLate = submission.SubmitAt > quizModule.ClosedAt;

        var result = await _submissionService.AddSubmission(submission);
        if (result != null)
        {
            var submitMapped = _mapper.Map<SubmitQuizQueryResponse>(result);

            return Success(submitMapped, "Submission successful.");
        }
        else
        {
            return BadRequest<SubmitQuizQueryResponse>(null,"Unable to process your request.");
        }
    }
}
