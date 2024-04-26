namespace ExamService.Core.Features.Quizzes.Queries.Responses;

public class ViewQuizDetailsQueryResponse
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime closedAt { get; set;}
    public decimal Grade { get; set; }
    public decimal Duration { get; set; }
    public string instructorName { get; set; }
}
