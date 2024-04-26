using ExamService.Core.Features.Quizzes.Queries.Responses;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile
{
    public void GetQuizByIdMapping()
    {
        CreateMap<Quiz, GetQuizByIdQueryResponse>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate.ToLocalTime()))
            .ForMember(dest => dest.StartedDate, opt => opt.MapFrom(src => src.StartedDate.ToLocalTime()))
            .ForMember(dest => dest.ClosedAt, opt => opt.MapFrom(src => src.ClosedAt.ToLocalTime()))
            .ForMember(dest => dest.Capacity, opt => opt.MapFrom(src => src.Capacity))
            .ForMember(dest => dest.Grade, opt => opt.MapFrom(src => src.Grade))
            .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
            .ForMember(dest => dest.quizModules, opt => opt.MapFrom(src => src.Modules));
    }
}
