using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class InstructorRepository:GenericRepositoryAsync<Instructor>,IInstructorRepository
{
    private readonly DbSet<Instructor> _instructors;
    public InstructorRepository(ApplicationDbContext context):base(context)
    {
        _instructors=context.Set<Instructor>();
    }

}
