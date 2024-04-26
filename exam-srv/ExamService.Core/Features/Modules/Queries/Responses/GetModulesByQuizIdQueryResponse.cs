using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Features.Modules.Queries.Responses;

public class GetModulesByQuizIdQueryResponse
{
    public int? AssignedCapacity { get; set; }
    public string Name { get; set; }
    public List<ModuleQuestions> Questions { get; set; }

}
public class ModuleQuestions
{
    public string Text { get; set; }
    public string ImageLink { get; set; } 
    public decimal Points { get; set; }
    public decimal Duration { get; set; }
    public string Type { get; set; }
    public List<QuestionOptions> Options { get; set; }
}
