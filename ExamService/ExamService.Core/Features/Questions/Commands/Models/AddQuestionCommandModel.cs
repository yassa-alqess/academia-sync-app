using ExamService.Core.Bases;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.DTOs.Questions;
using ExamService.Data.Helpers.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ExamService.Core.Features.Questions.Command.Models;

public class AddQuestionCommandModel:IRequest<Response<Question>>
{
    [Required]
    public string Text { get; set; }
    public string? ImageLink { get; set; }
    [Required]
    public decimal Points { get; set; }
    [Required]
    public decimal Duration { get; set; }
    [Required]
    public QuestionType Type { get; set; }
    [Required]
    public List<QuestionOptions> Options { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
}
