using ExamService.Core.Bases;
using ExamService.Core.Features.Students.Queries.Responses;
using MediatR;

namespace ExamService.Core.Features.Students.Queries.Models;

public class GetStudentByIdQueryModel:IRequest<Response<GetStudentByIdResponse>>
{
    public Guid studentId { get; set; }
    public Guid courseId { get; set; }

}
