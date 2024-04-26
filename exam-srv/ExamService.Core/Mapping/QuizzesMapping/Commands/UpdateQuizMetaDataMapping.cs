using ExamService.Core.Features.Quizzes.Commands.Models;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile
{
    public void UpdateQuizMetaDataMapping()
    {
        CreateMap<UpdateQuizMetaDataCommandModel, Quiz>()
            .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.quizId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now.ToUniversalTime()))
            .ForMember(dest => dest.StartedDate, opt => opt.MapFrom(src => src.StartedDate.ToUniversalTime()))
            .ForMember(dest => dest.ClosedAt, opt => opt.MapFrom(src => src.ClosedAt.ToUniversalTime()))
            .ForMember(dest => dest.Grade, opt => opt.MapFrom(src => src.Grade))
            .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
            .ForMember(dest => dest.CourseId,opt=>opt.MapFrom(src => src.courseId))
            .ForMember(dest => dest.InstructorId,opt=>opt.MapFrom(src=>src.instructorId));

    }
}
