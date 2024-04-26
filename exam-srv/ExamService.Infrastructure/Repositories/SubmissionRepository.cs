using ExamService.Data.Entities;
using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Data;
using ExamService.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Infrastructure.Repositories;

public class SubmissionRepository:GenericRepositoryAsync<Submission>,ISubmissionsRepository
{
    private readonly DbSet<Submission> _submissionRepository;
    public SubmissionRepository(ApplicationDbContext context):base(context)
    {
        _submissionRepository=context.Set<Submission>();
    }
}
