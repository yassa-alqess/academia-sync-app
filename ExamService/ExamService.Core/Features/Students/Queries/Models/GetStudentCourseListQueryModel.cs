using ExamService.Core.Bases;
using ExamService.Core.Features.Students.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace ExamService.Core.Features.Students.Queries.Models;

public class GetStudentCourseListQueryModel : IRequest<Response<List<GetStudentListResponse>>>
{
    [FromRoute]
    public Guid courseId { get; set; }
}

