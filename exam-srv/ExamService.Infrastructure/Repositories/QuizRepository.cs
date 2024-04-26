using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class QuizRepository:GenericRepositoryAsync<Quiz>,IQuizRepository
{
    private readonly DbSet<Quiz> _quizs;
    public QuizRepository(ApplicationDbContext context):base(context)
    {
        _quizs=context.Set<Quiz>();
    }
}
