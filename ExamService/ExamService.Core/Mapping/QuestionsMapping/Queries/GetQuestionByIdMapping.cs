using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Core.Features.Questions.Queries.Response;
using ExamService.Data.Entities;

namespace ExamService.Core.Mapping.Questions;

public partial class QuestionProfile
{
    public void GetQuestionByIdMapping()
    {
        CreateMap<Question, GetQuestionByIdResponse>()
            .ForMember(dest => dest.Options, opt => opt.MapFrom(src => src.Options))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));

    }
}
