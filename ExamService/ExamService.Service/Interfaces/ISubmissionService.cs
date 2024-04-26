using ExamService.Data.Entities;

namespace ExamService.Service.Interfaces;

public interface ISubmissionService
{
    public Task<Submission> AddSubmission(Submission submission);
    public Task<Submission> GetSubmissionById(Guid submissionId);
    public Task<List<Submission>> GetAllSubmissions(Guid courseId, Guid studentId, Guid moduleId);//check later
}
