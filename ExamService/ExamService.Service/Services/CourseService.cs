using ExamService.Data.Entities;
using ExamService.Infrastructure.Interfaces;
using ExamService.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Service.Services;

public class CourseService : ICourseService
{
    #region Fields
    private readonly ICourseRepository _courseRepository;
    #endregion
    #region Constructors
    public CourseService(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }
    #endregion
    #region Methods
    public async Task<Course> AddNew(Course course)
    {
       return await _courseRepository.AddAsync(course);
    }

    public async Task<Course?> GetById(Guid id)
    {
        return  await _courseRepository.GetTableNoTracking()
                               .Include(c => c.Questions)
                               .Include(c => c.Quizzes)
                               .FirstOrDefaultAsync(c => c.Id == id);
            
    }

    
    #endregion


}
