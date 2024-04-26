using ExamService.Core.Bases;
using ExamService.Core.Features.Quizzes.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Quizzes.Queries.Models;

public class GetAllCourseQuizzesCommandModel:IRequest<Response<List<GetAllCourseQuizzesQueryResponse>>>
{
    [FromRoute]
    public Guid courseId { get; set; }
    [FromRoute]
    public Guid instructorId { get; set; }
}
