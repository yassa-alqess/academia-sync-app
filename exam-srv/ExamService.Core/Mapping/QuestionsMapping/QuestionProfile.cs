using AutoMapper;

namespace ExamService.Core.Mapping.Questions;

public partial class QuestionProfile:Profile
{
    public QuestionProfile()
    {
        AddQuestionMapping();
        GetQuestionByIdMapping();
        GetAllQuestionsBankMapping();
        UpdateQuestionMapping();
       
    }
}
