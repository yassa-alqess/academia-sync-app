namespace ExamService.Core.Features.Students.Queries.Responses;

public class GetStudentByIdResponse
{
    public Guid Id { get; set; }
    public string DisplayName { get; set; }
    public string AcademicId { get; set; }
    public List<StudentCourse> Courses { get; set; }
}
public class StudentCourse
{
    public string Name { get; set; }
}
