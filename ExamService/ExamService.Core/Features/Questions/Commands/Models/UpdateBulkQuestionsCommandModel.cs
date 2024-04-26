using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Questions.Commands.Models;

public class UpdateBulkQuestionsCommandModel:IRequest<Response<string>>
{
    public List<UpdateQuestionCommandModel> updatedQuestions {  get; set; }
    [FromRoute]
    public Guid CourseId { get; set; }

}
 
