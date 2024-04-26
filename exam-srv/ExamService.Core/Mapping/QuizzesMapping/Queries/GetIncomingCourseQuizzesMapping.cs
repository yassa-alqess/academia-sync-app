using ExamService.Core.Features.Quizzes.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile
{
    public void GetIncomingCourseQuizzesMapping()
    {
        CreateMap<Quiz, GetIncomingCourseQuizzesQueryResponse>()
            .ForMember(dest => dest.StartedAt, opt => opt.MapFrom(src => src.StartedDate))
            .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.DisplayName))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
    }
}
