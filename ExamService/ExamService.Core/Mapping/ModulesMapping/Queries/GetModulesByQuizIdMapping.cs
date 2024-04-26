using AutoMapper;
using ExamService.Core.Features.Modules.Queries.Responses;
using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Mapping.ModulesMapping;

public partial class ModuleProfile
{
    public void GetModulesByQuizIdMapping()
    {
        CreateMap<ModuleQuestion, ModuleQuestions>()
        .ForMember(dest => dest.Options, opt => opt.MapFrom(src => src.Question.Options));

        CreateMap<Question, ModuleQuestions>()
        .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
        .ForMember(dest => dest.ImageLink, opt => opt.MapFrom(src => src.ImageLink))
        .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Points))
        .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
        .ForMember(dest=>dest.Type,opt=>opt.MapFrom(src=>src.Type.ToString()));

        CreateMap<Module, GetModulesByQuizIdQueryResponse>()
        .ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.ModuleQuestions.Select(moduleQuestion =>
            new ModuleQuestions
            {
                Text = moduleQuestion.Question.Text,
                ImageLink = moduleQuestion.Question.ImageLink,
                Points = moduleQuestion.Question.Points,
                Duration = moduleQuestion.Question.Duration,
                Type=moduleQuestion.Question.Type.ToString(),
                Options = moduleQuestion.Question.Options.Select(option =>
                    new QuestionOptions
                    {
                        Text = option.Text,
                        IsCorrect = option.IsCorrect
                    }).ToList()
            })));



    }
}
