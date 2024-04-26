using ExamService.Core.Bases;
using ExamService.Core.Features.Quizzes.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Quizzes.Queries.Models;

public class ViewQuizDetailsQueryModel:IRequest<Response<ViewQuizDetailsQueryResponse>>
{
    [FromQuery]
    public Guid quizId { get; set; }
}
