using AutoMapper;

namespace ExamService.Core.Mapping.QuizzesMapping;

public partial class QuizProfile:Profile
{
    public QuizProfile() 
    {
        CreateQuizMapping();
        GetAllCourseQuizzesMapping();
        GetQuizByIdMapping();
        UpdateQuizMetaDataMapping();
        ViewQuizDetailsQueryMapping();
        GetIncomingCourseQuizzesMapping();
    }
}