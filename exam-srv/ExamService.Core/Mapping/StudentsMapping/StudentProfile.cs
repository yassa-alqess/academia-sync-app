using AutoMapper;

namespace ExamService.Core.Mapping.Students;

public partial class StudentProfile:Profile
{
    public StudentProfile()
    {
        GetStudentListMapping();
        GetStudentByIdMapping();
        SubmitQuizAnswersMapping();
        GetSubmitDetailsQueryMapping();
    }
}
