using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class CourseRepository:GenericRepositoryAsync<Course>,ICourseRepository
{
    private readonly DbSet<Course> _courses;
    public CourseRepository(ApplicationDbContext context):base(context)
    {
        _courses=context.Set<Course>();
    }
}
