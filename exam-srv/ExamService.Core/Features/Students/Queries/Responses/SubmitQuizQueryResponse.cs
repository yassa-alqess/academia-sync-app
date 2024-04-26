namespace ExamService.Core.Features.Students.Queries.Responses;

public class SubmitQuizQueryResponse
{
    public decimal TotalGrade { get; set; }
    public DateTime SubmitAt { get; set; }
    public bool IsLate { get; set; }
    public TimeOnly TimeTaken { get; set; }
}
