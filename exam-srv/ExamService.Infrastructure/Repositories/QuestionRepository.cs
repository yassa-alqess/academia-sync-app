using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class QuestionRepository : GenericRepositoryAsync<Question>, IQuestionRepository
{
    private readonly DbSet<Question> _questions;
    public QuestionRepository(ApplicationDbContext context):base(context)
    {
        _questions = context.Set<Question>();
    }

    
}
