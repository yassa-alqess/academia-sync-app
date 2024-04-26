using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.Enums;

namespace ExamService.Core.Mapping.Questions;

public partial class QuestionProfile
{
    public void AddQuestionMapping()
    {
        CreateMap<AddQuestionCommandModel, Question>()
            .ForMember(dest => dest.ImageLink, opt => opt.MapFrom(src => src.ImageLink ?? ""))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Options, opt => opt.MapFrom(src => src.Options));
    }

}
