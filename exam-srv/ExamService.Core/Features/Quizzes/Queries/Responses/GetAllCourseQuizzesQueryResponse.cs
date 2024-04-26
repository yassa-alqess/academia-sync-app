using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Features.Quizzes.Queries.Responses;

public class GetAllCourseQuizzesQueryResponse
{
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime StartedDate { get; set; }
    public DateTime ClosedAt { get; set; }
    public bool IsPublished { get; set; }
     
}
public class QuizModules
{
    public int AssignedCapacity { get; set; }
    public string Name { get; set; }
    public List<ModuleQuestions> Questions { get; set; }

}
public class ModuleQuestions
{
    public string Text { get; set; }
    public string? ImageLink { get; set; }

    public int Points { get; set; }

    public int Duration { get; set; }

    public string Type { get; set; }

    public List<QuestionOptions> Options { get; set; }
}
