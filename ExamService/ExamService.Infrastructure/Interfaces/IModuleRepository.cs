using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;

namespace ExamService.Infrastructure.Interfaces;

public interface IModuleRepository:IGenericRepositoryAsync<Module>
{
    public void DetachQuestions(Module module);
}
