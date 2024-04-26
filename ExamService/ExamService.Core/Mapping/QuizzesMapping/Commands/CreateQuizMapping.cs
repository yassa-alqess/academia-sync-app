using ExamService.Core.Features.Quizzes.Commands.Models;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile
{
    public void CreateQuizMapping()
    {
        CreateMap<CreateQuizCommandModel, Quiz>()
        .ForMember(dest => dest.Grade, opt => opt.MapFrom(src => src.Grade))
        .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
        .ForMember(dest => dest.Modules, opt => opt.Ignore())
        .ForMember(dest => dest.StudentQuizzes, opt => opt.Ignore())
        .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(_ => DateTime.Now.ToUniversalTime()))
        .ForMember(dest => dest.ClosedAt, opt => opt.MapFrom(src => src.DeadLine.ToUniversalTime()))
        .ForMember(dest=>dest.StartedDate,opt=>opt.MapFrom(src=>src.StartedDate.ToUniversalTime()));

    }
}
