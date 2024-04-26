using ExamService.Core.Features.Students.Command.Models;
using ExamService.Core.Features.Students.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.Students;

public partial class StudentProfile
{
    public void SubmitQuizAnswersMapping()
    {
        CreateMap<SubmitQuizAnswersCommandModel, Submission>()
            .ForMember(dest => dest.SubmitAt, opt => opt.MapFrom(_ => DateTime.Now.ToUniversalTime()))
            .ForMember(dest => dest.TimeTaken, opt => opt.MapFrom(src => src.TimeTaken))
            .ForMember(dest => dest.TotalGrade, opt => opt.MapFrom(src => src.TotalGrade))
            .ForMember(dest => dest.ModuleId, opt => opt.MapFrom(src => src.moduleId))
            .ForMember(dest => dest.StudentId, opt => opt.MapFrom(src => src.studentId));
    }
}
