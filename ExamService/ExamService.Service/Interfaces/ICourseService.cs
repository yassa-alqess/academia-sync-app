using ExamService.Data.Entities;

namespace ExamService.Service.Interfaces;

public interface ICourseService
{
    public Task<Course?> GetById(Guid id);
    public Task<Course> AddNew(Course course);
    

}
