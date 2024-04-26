using AutoMapper;

namespace ExamService.Core.Mapping.CoursesMapping;

public partial class CourseProfile : Profile
{
    public CourseProfile()
    {
        GetInstructorCoursesMapping();
    }
}

