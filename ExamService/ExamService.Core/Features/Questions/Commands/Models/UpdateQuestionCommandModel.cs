using ExamService.Core.Bases;
using ExamService.Data.Helpers.DTOs.Questions;
using ExamService.Data.Helpers.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Questions.Commands.Models;

public class UpdateQuestionCommandModel:IRequest<Response<string>>
{
    [FromRoute]
    public Guid questionId { get; set; }
    public string Text { get; set; }
    public string? ImageLink { get; set; }

    public decimal Points { get; set; }

    public decimal Duration { get; set; }

    public QuestionType Type { get; set; }

    public List<QuestionOptions> Options { get; set; }
    [FromRoute]
    public Guid CourseId { get; set; }
}

