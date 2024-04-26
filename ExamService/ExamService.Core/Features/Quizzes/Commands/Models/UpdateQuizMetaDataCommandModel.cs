using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Quizzes.Commands.Models;

public class UpdateQuizMetaDataCommandModel:IRequest<Response<string>>
{
    [FromRoute]
    public Guid quizId { get; set; }
    [FromRoute]
    public Guid instructorId { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime StartedDate { get; set; }
    public DateTime ClosedAt { get; set; }
    public decimal Grade { get; set; }
    public double Duration { get; set; }

}
