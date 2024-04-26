namespace ExamService.Core.Features.Quizzes.Queries.Responses;

public class GetQuizByIdQueryResponse
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime StartedDate { get; set; }
    public DateTime ClosedAt { get; set; }
    public DateTime updatedAt { get; set; }
    public int Capacity { get; set; }
    public decimal Grade { get; set; }
    public double Duration { get; set; }
    public List<QuizModules> quizModules { get; set; }
}
