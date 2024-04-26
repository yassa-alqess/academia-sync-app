using ExamService.Data.Entities;
using ExamService.Infrastructure.Interfaces;
using ExamService.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExamService.Service.Services;

public class SubmissionService : ISubmissionService
{
    #region Fields
    private readonly ISubmissionsRepository _submissionsRepository;


    #endregion


    #region Constructors
    public SubmissionService(ISubmissionsRepository submissionsRepository)
    {
        _submissionsRepository = submissionsRepository;
    }


    #endregion


    #region Methods
    public async Task<Submission> AddSubmission(Submission submission)
    {
        return await _submissionsRepository.AddAsync(submission);
    }

    public Task<List<Submission>> GetAllSubmissions(Guid courseId, Guid studentId, Guid moduleId)
    {
        throw new NotImplementedException();
    }

    public async Task<Submission?> GetSubmissionById(Guid submissionId)
    {
        return _submissionsRepository.GetTableNoTracking()
                                                     .Include(s=>s.Module)
                                                     .Where(s=>s.Id== submissionId)
                                                     .FirstOrDefault();
    }
    #endregion
}
