using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Core.Features.Questions.Commands.Models;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.Enums;

namespace ExamService.Core.Mapping.Questions;

public partial class QuestionProfile
 {

    public void UpdateQuestionMapping()
    {
        CreateMap<UpdateQuestionCommandModel, Question>()
            .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.questionId))
            .ForMember(dest => dest.ImageLink, opt => opt.MapFrom(src => src.ImageLink ?? ""))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Options, opt => opt.MapFrom(src => src.Options));
    }

}




