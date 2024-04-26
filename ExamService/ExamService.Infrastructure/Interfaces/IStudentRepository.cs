using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;

namespace ExamService.Infrastructure.Interfaces;

public interface IStudentRepository:IGenericRepositoryAsync<Student>
{
}
