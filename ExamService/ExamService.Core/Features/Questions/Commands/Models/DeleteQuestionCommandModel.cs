using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Questions.Commands.Models;

public class DeleteQuestionCommandModel:IRequest<Response<string>>
{
    public Guid questionId { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
}
