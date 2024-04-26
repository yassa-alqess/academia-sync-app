using ExamService.Core.Bases;
using ExamService.Core.Features.Instructors.Queries.Responses;
using MediatR;

namespace ExamService.Core.Features.Instructors.Queries.Models;

public class GetInstructorByIdQueryModel:IRequest<Response<GetInstructorByIdResponse>>
{
    public Guid Id { get; set; }
}
