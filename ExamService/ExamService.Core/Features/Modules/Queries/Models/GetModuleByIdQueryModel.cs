using ExamService.Core.Bases;
using ExamService.Core.Features.Modules.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Modules.Queries.Models;

public class GetModuleByIdQueryModel:IRequest<Response<GetModuleByIdQueryResponse>>
{
    [FromQuery]
    public Guid moduleId { get; set; }
}
