
using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class StudentRepository : GenericRepositoryAsync<Student>, IStudentRepository
{
    private readonly  DbSet<Student> _student;

    public StudentRepository(ApplicationDbContext context):base(context)
    {
        _student = context.Set<Student>();
    }
    
}
