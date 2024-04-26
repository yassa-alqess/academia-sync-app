using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Questions.Commands.Models;

public class AddQuestionBankCommandModel:IRequest<Response<string>>
{
    public IFormFile ExcelBankSheet { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
}
