using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class ModuleRepository : GenericRepositoryAsync<Module>, IModuleRepository
{
    private readonly DbSet<Module> _modules;
    public ModuleRepository(ApplicationDbContext context) : base(context)
    {
        _modules = context.Set<Module>();
    }

    public void DetachQuestions(Module module)
    {
        foreach (var moduleQuestion in module.ModuleQuestions)
        {
            foreach (var questionOption in moduleQuestion.Question.Options)
            {
                // Attach existing question options to the context
                _context.Entry(questionOption).State = EntityState.Unchanged;
            }
            // Attach existing questions to the context
            _context.Entry(moduleQuestion.Question).State = EntityState.Unchanged;
        }
    }
}
