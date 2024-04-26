using ExamService.Core.Bases;
using ExamService.Data.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Modules.Commands.Models;

public class GenerateQuizModulesCommandModel:IRequest<Response<List<Module>>>
{
    public IFormFile? questionsSheet {  get; set; }
    public int moduleNumbers { get; set; }
    public int numberOfQuestionsPerModule { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
    [FromRoute]
    public Guid instructorId { get; set; }
}
