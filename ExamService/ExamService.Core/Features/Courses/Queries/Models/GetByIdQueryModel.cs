using ExamService.Core.Bases;
using ExamService.Core.Features.Courses.Queries.Responses;
using MediatR;

namespace ExamService.Core.Features.Courses.Queries.Models;

public class GetByIdQueryModel:IRequest<Response<GetByIdResponse>>
{
    public Guid Id { get; set; }
}
