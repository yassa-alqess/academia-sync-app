namespace ExamService.Core.Features.Quizzes.Queries.Responses;

public class GetIncomingCourseQuizzesQueryResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime StartedAt {  get; set; }
    public string InstructorName { get; set; }
}
