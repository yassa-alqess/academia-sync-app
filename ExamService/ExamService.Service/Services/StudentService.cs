using ExamService.Data.Entities;
using ExamService.Infrastructure.Interfaces;
using ExamService.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Service.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;

    public StudentService(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task AddStudentList(List<Student> students)
    {
        await _studentRepository.AddRangeAsync(students);
    }

    public async Task<Student?> GetStudentByIdAsync(Guid studentId,Guid courseId)
    {
        return await _studentRepository.GetTableNoTracking()
                .Include(s => s.StudentCourses)
                    .ThenInclude(sc => sc.course) // Optionally include the Course entity if needed
                .FirstOrDefaultAsync(s => s.Id == studentId && s.StudentCourses.Any(sc => sc.CourseId == courseId));
    }

    public async Task<List<Student>> GetStudentListAsync(Guid courseId)
    {
        return await _studentRepository.GetTableNoTracking()
                .Include(s => s.StudentCourses)
                    .ThenInclude(sc => sc.course) // Optionally include the Course entity if needed
                .Where(s =>s.StudentCourses.Any(sc => sc.CourseId == courseId)).ToListAsync();
    }
}
