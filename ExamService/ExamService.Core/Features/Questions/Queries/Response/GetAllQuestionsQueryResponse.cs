using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Features.Questions.Queries.Response;

public class GetAllQuestionsQueryResponse
{
    public string Text { get; set; }
    public string? ImageLink { get; set; }

    public int Points { get; set; }

    public int Duration { get; set; }

    public string Type { get; set; }// todo:parse type to string 

    public List<QuestionOptions> Options { get; set; }
}
