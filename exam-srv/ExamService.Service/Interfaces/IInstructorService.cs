using ExamService.Data.Entities;

namespace ExamService.Service.Interfaces;

public interface IInstructorService
{
    public Task<Instructor?> GetInstructorByIdAsync(Guid id);
    public Task<Instructor> AddInstructorAsync(Instructor instructor);
    public Task<List<Course>> GetInstructorCourses(Guid instructorId);

}
