using ExamService.Core.Features.Modules.Queries.Responses;
using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.DTOs.Questions;

namespace ExamService.Core.Mapping.ModulesMapping;

public partial class ModuleProfile
{
    public void GetModuleByIdMapping()
    {
        CreateMap<Module, GetModuleByIdQueryResponse>()
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
