using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Quizzes.Commands.Models;

public class CreateQuizCommandModel:IRequest<Response<string>>
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime StartedDate { get; set; }
    //calculated when the modules is assigned,
    //it's equals to total numbers of assigned student for all quiz's modules
    public decimal Grade { get; set; }
    //calculated in two ways if the teacher is assign it direct will creating the quiz 
    // or is auto calculated through summution of number of questions multiple with the duration of single question. 
    public double? Duration { get; set; }
    [FromRoute]
    public Guid instructorId { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
    public DateTime DeadLine { get; set; }// to map ClosedAt 

}
