using ExamService.Core.Features.Quizzes.Queries.Responses;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile
{
    public void GetAllCourseQuizzesMapping()
    {
        //CreateMap<ModuleQuestion, ModuleQuestions>()
        //    .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Question.Text))
        //    .ForMember(dest => dest.ImageLink, opt => opt.MapFrom(src => src.Question.ImageLink))
        //    .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Question.Points))
        //    .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Question.Duration))
        //    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Question.Type.ToString()))
        //    .ForMember(dest => dest.Options, opt => opt.MapFrom(src => src.Question.Options));

        //CreateMap<Option, QuestionOptions>()
        //    .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
        //    .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(src => src.IsCorrect));

        //CreateMap<Question, ModuleQuestions>()
        //   .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));

        //CreateMap<Module, QuizModules>()
        //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
        //    .ForMember(dest => dest.AssignedCapacity, opt => opt.MapFrom(src => src.AssignedCapacity))
        //    .ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.ModuleQuestions));

        CreateMap<Quiz, GetAllCourseQuizzesQueryResponse>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate.ToLocalTime()))
            .ForMember(dest => dest.StartedDate, opt => opt.MapFrom(src => src.StartedDate.ToLocalTime()))
            .ForMember(dest => dest.ClosedAt, opt => opt.MapFrom(src => src.ClosedAt.ToLocalTime()))
            .ForMember(dest=>dest.IsPublished,opt=>opt.MapFrom(src=>src.Capacity==0?false:true));
    }
}
