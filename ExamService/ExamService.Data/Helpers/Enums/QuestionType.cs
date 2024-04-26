using System.ComponentModel.DataAnnotations;

namespace ExamService.Data.Helpers.Enums;

public enum QuestionType
{
    [Display(Name = "Multiple Choice")]
    MultiChoice,
    [Display(Name = "True/False")]
    TrueFalse
}
