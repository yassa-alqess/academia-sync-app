using ExamService.Core.Features.Students.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.Students
{
    public partial class StudentProfile
    {
        public void GetStudentByIdMapping()
        {
            CreateMap<Student, GetStudentByIdResponse>()
        .ForMember(dest => dest.Courses, opt => opt.MapFrom(src => src.StudentCourses.Select(sc => new StudentCourse
        {
            Name = sc.course.Name // Assuming the Course entity has a Name property
        })));
        }
    }
}
