using ExamService.Core.Features.Quizzes.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile 
{
    public void ViewQuizDetailsQueryMapping()
    {
        CreateMap<Quiz, ViewQuizDetailsQueryResponse>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.instructorName, opt => opt.MapFrom(src => src.Instructor.DisplayName))
            .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
            .ForMember(dest => dest.Grade, opt => opt.MapFrom(src => src.Grade))
            .ForMember(dest => dest.closedAt, opt => opt.MapFrom(src => src.ClosedAt.ToLocalTime()))
            .ForMember(dest => dest.StartedAt, opt => opt.MapFrom(src => src.StartedDate.ToLocalTime()));
    }
}
