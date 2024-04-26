namespace ExamService.Data.Helpers.DTOs.Questions.CommandDTOs.QuizEndpints;

public class GetByQuizIdModuleQuestionsDto
{
    public string Text { get; set; }
    public string ImageLink { get; set; }
    public decimal Points { get; set; }
    public decimal Duration { get; set; }
    public List<QuestionOptions> Options { get; set; }
}
