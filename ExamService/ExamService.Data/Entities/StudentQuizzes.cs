using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamService.Data.Entities;

public class StudentQuizzes
{
    [Key]
    public Guid Id { get; set; }

    [ForeignKey(nameof(StudentId))]
    public Guid StudentId { get; set; }
    public Student Student { get; set; }

    [ForeignKey(nameof(ModuleId))]
    public Guid ModuleId { get; set; }
    public Module Module { get; set; }

    [ForeignKey(nameof(QuizId))]
    public Guid QuizId { get; set; }
    public Quiz quiz { get; set; }
}
