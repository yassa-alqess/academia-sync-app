using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Quizzes.Commands.Models;
using ExamService.Data.Entities;
using ExamService.Service.Interfaces;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace ExamService.Core.Features.Quizzes.Commands.Handlers;

public class QuizCommandHandler : ResponseHandler
                                , IRequestHandler<CreateQuizCommandModel, Response<string>>
                                , IRequestHandler<UpdateQuizMetaDataCommandModel, Response<string>>
{

    #region Fields
    private readonly IMapper _mapper;
    private readonly IDistributedCache _cache;
    private readonly IModuleService _moduleService;
    private readonly IQuizService _quizService;
    private readonly IInstructorService _instructorService;
    #endregion
    #region Constructors
    public QuizCommandHandler(IInstructorService instructorService,IMapper mapper,IQuizService quizService,IDistributedCache cache,IModuleService moduleService)
    {
        _mapper = mapper;
        _cache = cache;
        _moduleService = moduleService;
        _quizService = quizService;
        _instructorService = instructorService;
    }
    #endregion
    #region Methods
    public async Task<Response<string>> Handle(CreateQuizCommandModel request, CancellationToken cancellationToken)
    {
        var mappedQuiz =  _mapper.Map<Quiz>(request);
        var addedQuiz= await _quizService.CreateQuiz(mappedQuiz);
        if(addedQuiz != null)
        {
            var cacheKey = $"GeneratedModules:{request.courseId}:{request.instructorId}";
            var serializedModules = await _cache.GetStringAsync(cacheKey);
            var confirmedModules = JsonConvert.DeserializeObject<List<Module>>(serializedModules);

            if(confirmedModules != null)
            {
                foreach(var module in confirmedModules)
                {
                    module.QuizId = addedQuiz.Id;//ForeignKey
                    module.Quiz=addedQuiz;//Navigation Property
                }
                var addedModules=await _moduleService.SaveModules(confirmedModules);
                foreach(var module in addedModules)
                {
                    addedQuiz.Modules.Add(module);
                }
                return Created("Quiz is Created Successfully");
            }
        }
        return UnprocessableEntity<string>("Can't process your request now,please try again"); 
    }

    public async Task<Response<string>> Handle(UpdateQuizMetaDataCommandModel request, CancellationToken cancellationToken)
    {
        var queryQuiz=await _quizService.GetQuizById(request.quizId);
        if (queryQuiz == null)
            return NotFound<string>("Quiz you are trying to edit on it is not found ");
        var quizMapped = _mapper.Map<Quiz>(request);
        quizMapped.CreatedDate=queryQuiz.CreatedDate;

        await _quizService.UpdateQuiz(quizMapped);
        return Success<string>("your updating request is done successfully");
    }
    #endregion
}
