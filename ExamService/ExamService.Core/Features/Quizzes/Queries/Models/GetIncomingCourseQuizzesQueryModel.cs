using ExamService.Core.Bases;
using ExamService.Core.Features.Quizzes.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Quizzes.Queries.Models;

public class GetIncomingCourseQuizzesQueryModel:IRequest<Response<List<GetIncomingCourseQuizzesQueryResponse>>>
{
    [FromBody]
    public Guid courseId { get; set; }
}
