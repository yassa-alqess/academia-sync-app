using AutoMapper;
using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Mapping.Questions;

public class OptionProfile:Profile
{
    public OptionProfile()
    {
        CreateMap<QuestionOptions, Option>()
            .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
            .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(src => src.IsCorrect));

        CreateMap<Option, QuestionOptions>()
            .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
            .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(src => src.IsCorrect));
    }
}
