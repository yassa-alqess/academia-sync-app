using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Modules.Queries.Models;
using ExamService.Core.Features.Modules.Queries.Responses;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Modules.Queries.Handlers;

public class ModulesQueryHandler : ResponseHandler
                                 , IRequestHandler<GetModulesByQuizIdQueryModel,Response<List<GetModulesByQuizIdQueryResponse>>>
                                 , IRequestHandler<GetModuleByIdQueryModel, Response<GetModuleByIdQueryResponse>>
                
{

    #region Fields
    private readonly IMapper _mapper;
    private readonly IModuleService _moduleService;
    #endregion

    #region Constructors
    public ModulesQueryHandler(IMapper mapper,IModuleService moduleService)
    {
        _mapper = mapper;
        _moduleService = moduleService;
    }
    #endregion

    #region Methods
    public async Task<Response<List<GetModulesByQuizIdQueryResponse>>> Handle(GetModulesByQuizIdQueryModel request, CancellationToken cancellationToken)
    {
        var quizModules=await _moduleService.GetModulesByQuizId(request.quizId);

        if (quizModules == null)
            return NotFound<List<GetModulesByQuizIdQueryResponse>>("No modules associated to this quiz");
        var moduleMapped= _mapper.Map<List<GetModulesByQuizIdQueryResponse>>(quizModules);
        return Success(moduleMapped);
    }

    async Task<Response<GetModuleByIdQueryResponse>> IRequestHandler<GetModuleByIdQueryModel, Response<GetModuleByIdQueryResponse>>.Handle(GetModuleByIdQueryModel request, CancellationToken cancellationToken)
    {
        var existingModule=await _moduleService.GetModuleById(request.moduleId);
        if (existingModule == null)
            return NotFound<GetModuleByIdQueryResponse>("Module is not exist");
        var moduleMapped= _mapper.Map<GetModuleByIdQueryResponse>(existingModule);
        return Success(moduleMapped);
    }
    #endregion
}
