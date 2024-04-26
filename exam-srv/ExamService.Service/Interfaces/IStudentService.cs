using ExamService.Data.Entities;

namespace ExamService.Service.Interfaces;

public interface IStudentService
{
    public Task<List<Student>> GetStudentListAsync(Guid courseId);
    public Task<Student?> GetStudentByIdAsync(Guid studentId, Guid courseId);
    public Task AddStudentList (List<Student> students);
}
