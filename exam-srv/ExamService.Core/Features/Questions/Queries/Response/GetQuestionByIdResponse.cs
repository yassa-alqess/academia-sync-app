using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Helpers.DTOs.Questions;
using ExamService.Data.Helpers.Enums;
using System.ComponentModel.DataAnnotations;

namespace ExamService.Core.Features.Questions.Queries.Response;

public class GetQuestionByIdResponse
{
    public string Text { get; set; }
    public string ImageLink { get; set; }
    public int Points { get; set; }
    public int Duration { get; set; }
    public string Type { get; set; } 
    public List<QuestionOptions> Options { get; set; }
}

