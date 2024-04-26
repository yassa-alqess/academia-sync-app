using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamService.Data.Entities;

public class Course
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<Quiz> Quizzes { get; set; } 
    public ICollection<InstructorCourses> InstructorCourses { get; set; }
    public ICollection<StudentCourses> studentCourses { get; set; }
    public virtual ICollection<Question> Questions { get; set; }
}
