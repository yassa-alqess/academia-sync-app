namespace ExamService.Core.DTOs.Questions;

public class UpdatedQuestionDto
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public string? ImageLink { get; set; }

    public int Points { get; set; }

    public int Duration { get; set; }

    public int Type { get; set; }

    public string Answer { get; set; }

    public List<string> Options { get; set; }
}
