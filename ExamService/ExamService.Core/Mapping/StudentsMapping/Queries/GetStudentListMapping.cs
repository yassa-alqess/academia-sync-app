using ExamService.Core.Features.Students.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.Students;

public partial class StudentProfile
{
    public void GetStudentListMapping()
    {
        CreateMap<Student, GetStudentListResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.AcademicId, opt => opt.MapFrom(src => src.AcademicId))
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.DisplayName));

    }
}
