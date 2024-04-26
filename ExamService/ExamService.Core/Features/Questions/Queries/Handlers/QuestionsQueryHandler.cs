using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Questions.Queries.Models;
using ExamService.Core.Features.Questions.Queries.Response;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Questions.Queries.Handlers;

public class QuestionsQueryHandler : ResponseHandler
                                    ,IRequestHandler<GetAllQuestionsQueryModel, Response<List<GetAllQuestionsQueryResponse>>>
                                    ,IRequestHandler<GetQuestionByIdQueryModel, Response<GetQuestionByIdResponse>>
{
    #region Fields
    private readonly IMapper _mapper;
    private readonly IQuestionService _questionService;
    #endregion
    #region Constructors
    public QuestionsQueryHandler(IMapper mapper,IQuestionService questionService)
    {
        _mapper = mapper;
        _questionService = questionService;
    }
    #endregion
    #region Methods
    public async Task<Response<List<GetAllQuestionsQueryResponse>>> Handle(GetAllQuestionsQueryModel request, CancellationToken cancellationToken)
    {
        var questionList = await _questionService.GetAllQuestionsAsync(request.courseId);
         var mappedQuestions=_mapper.Map<List<GetAllQuestionsQueryResponse>>(questionList);
        if (mappedQuestions is not null)
            return Success(mappedQuestions);
        else
            return NotFound<List<GetAllQuestionsQueryResponse>>("There is no questions yet!!");
    }
    public async Task<Response<GetQuestionByIdResponse>> Handle(GetQuestionByIdQueryModel request, CancellationToken cancellationToken)
    {
        var inquiredQuestion = await _questionService.GetQuestionByIdAsync(request.questionId);
        var questionMapper = _mapper.Map<GetQuestionByIdResponse>(inquiredQuestion);
        if (inquiredQuestion != null) return Success(questionMapper);
        return NotFound<GetQuestionByIdResponse>($"Not found question with {request.questionId}");
    }
    #endregion
}
