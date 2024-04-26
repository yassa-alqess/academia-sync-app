using System.ComponentModel.DataAnnotations.Schema;

namespace ExamService.Data.Entities;

public class StudentCourses
{
    [ForeignKey(nameof(StudentId))]
    public Guid StudentId { get; set; }
    public Student student { get; set; }

    [ForeignKey(nameof(CourseId))]
    public Guid CourseId { get; set; }
    public Course course { get; set; }
}
