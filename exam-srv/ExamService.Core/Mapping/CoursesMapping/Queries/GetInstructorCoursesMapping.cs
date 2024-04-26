using ExamService.Core.Features.Instructors.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.CoursesMapping;

public partial class CourseProfile
{
    public void GetInstructorCoursesMapping()
    {
        CreateMap<Course, GetInstructorCoursesQueryResponse>()
            .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.CourseId, opt => opt.MapFrom(src => src.Id));
    }
}
