using System.ComponentModel.DataAnnotations.Schema;

namespace ExamService.Data.Entities;

public class InstructorCourses
{
    [ForeignKey(nameof(InstructorId))]
    public Guid InstructorId { get; set; }
    public Instructor instructor { get; set; }

    [ForeignKey(nameof(CourseId))]
    public Guid CourseId { get; set; }
    public Course course { get; set; }
}
