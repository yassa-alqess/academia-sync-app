using ExamService.Core.Bases;
using ExamService.Core.Features.Modules.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Students.Command.Models;

public class EnrollToQuizCommandModel:IRequest<Response<GetModuleByIdQueryResponse>>
{
    [FromBody]
    public Guid quizId { get; set; }
    [FromBody]
    public Guid studentId { get; set; }
}
