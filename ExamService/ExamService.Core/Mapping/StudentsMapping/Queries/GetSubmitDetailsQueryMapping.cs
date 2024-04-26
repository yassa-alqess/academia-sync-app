using ExamService.Core.Features.Students.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.Students;

public partial class StudentProfile
{
    public void GetSubmitDetailsQueryMapping()
    {
        CreateMap<Submission, SubmitQuizQueryResponse>()
            .ForMember(dest => dest.SubmitAt, opt => opt.MapFrom(src => src.SubmitAt))
            .ForMember(dest => dest.TimeTaken, opt => opt.MapFrom(src => src.TimeTaken))
            .ForMember(dest => dest.TotalGrade, opt => opt.MapFrom(src => src.TotalGrade))
            .ForMember(dest => dest.IsLate, opt => opt.MapFrom(src => src.IsLate));
    }
}
