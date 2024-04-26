using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class StudentQuizzesRepository:GenericRepositoryAsync<StudentQuizzes>,IStudentQuizzesRepository
{
    private readonly DbSet<StudentQuizzes> _studentQuizzes;
    public StudentQuizzesRepository(ApplicationDbContext context ):base(context)
    {
        _studentQuizzes= context.Set<StudentQuizzes>();
    }
}
