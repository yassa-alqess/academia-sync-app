using ExamService.Core.Bases;
using ExamService.Core.Features.Students.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Students.Command.Models;

public class SubmitQuizAnswersCommandModel:IRequest<Response<SubmitQuizQueryResponse>>
{
    [FromBody]
    public Guid quizId { get; set; }
    [FromBody]
    public Guid moduleId { get; set; }
    [FromBody]
    public Guid studentId { get; set; }

    public decimal TotalGrade { get; set; }
    public TimeOnly TimeTaken { get; set; }
}
