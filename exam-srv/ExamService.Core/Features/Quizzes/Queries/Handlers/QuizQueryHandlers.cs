using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Quizzes.Queries.Models;
using ExamService.Core.Features.Quizzes.Queries.Responses;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Quizzes.Queries.Handlers;

public class QuizQueryHandlers:ResponseHandler
                              ,IRequestHandler<GetAllCourseQuizzesCommandModel,Response<List<GetAllCourseQuizzesQueryResponse>>>
                              ,IRequestHandler<GetQuizByIdQueryModel,Response<GetQuizByIdQueryResponse>>
                              ,IRequestHandler<ViewQuizDetailsQueryModel,Response<ViewQuizDetailsQueryResponse>>
                              ,IRequestHandler<GetIncomingCourseQuizzesQueryModel,Response<List<GetIncomingCourseQuizzesQueryResponse>>>
{
    #region Fields
    private readonly IQuizService _quizService;
    private readonly IMapper _mapper;
    #endregion

    #region Constructors
    public QuizQueryHandlers(IQuizService quizService, IMapper mapper)
    {
        _quizService = quizService;
        _mapper = mapper;
    }


    #endregion

    #region Methods
    public async Task<Response<List<GetAllCourseQuizzesQueryResponse>>> Handle(GetAllCourseQuizzesCommandModel request, CancellationToken cancellationToken)
    {
        var courseQuizzes= await _quizService.GetAllQuizzes(request.instructorId, request.courseId);
        if (courseQuizzes == null)
            return NotFound<List<GetAllCourseQuizzesQueryResponse>>("This course have no quizzes yet");
        var courseQuizzesMapped= _mapper.Map<List<GetAllCourseQuizzesQueryResponse>>(courseQuizzes);
        return Success(courseQuizzesMapped);
    }

    public async Task<Response<GetQuizByIdQueryResponse>> Handle(GetQuizByIdQueryModel request, CancellationToken cancellationToken)
    {
        var queryQuiz = await _quizService.GetQuizById(request.quizId);
        if (queryQuiz == null)
            return NotFound<GetQuizByIdQueryResponse>("Quiz not founded");
        var quizMapped=_mapper.Map<GetQuizByIdQueryResponse>(queryQuiz);
        return Success(quizMapped);
    }

    public async Task<Response<ViewQuizDetailsQueryResponse>> Handle(ViewQuizDetailsQueryModel request, CancellationToken cancellationToken)
    {
        var inquiredQuiz= await _quizService.GetQuizById(quizId: request.quizId);
        if (inquiredQuiz == null)
            return NotFound<ViewQuizDetailsQueryResponse>("Quiz not founded");
        var quizMapped=_mapper.Map<ViewQuizDetailsQueryResponse>(inquiredQuiz);
        return Success(quizMapped);
    }

    public async Task<Response<List<GetIncomingCourseQuizzesQueryResponse>>> Handle(GetIncomingCourseQuizzesQueryModel request, CancellationToken cancellationToken)
    {
        var inquiredQuizzes = await _quizService.GetIncomingCourseQuizzes(request.courseId);
        if (inquiredQuizzes == null)
            return NotFound<List<GetIncomingCourseQuizzesQueryResponse>>("there is no incomming quizzes yet");
        var quizzesMapped = _mapper.Map<List<GetIncomingCourseQuizzesQueryResponse>>(inquiredQuizzes);
        return Success(quizzesMapped);
    }
    #endregion
}
