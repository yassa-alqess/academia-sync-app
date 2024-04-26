using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Questions.Commands.Models;

public class DeleteBulkQuestionsCommandModel:IRequest<Response<string>>
{
    public List<DeleteQuestionCommandModel> deletedQuestions { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
}
