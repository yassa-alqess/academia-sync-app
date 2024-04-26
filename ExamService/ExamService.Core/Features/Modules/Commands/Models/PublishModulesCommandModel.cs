using ExamService.Core.Bases;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Modules.Commands.Models;

public class PublishModulesCommandModel:IRequest<Response<string>>
{
    public List<StudentDto>? students { get; set; }
    [FromRoute]
    public Guid courseId { get; set; }
    [FromRoute]
    public Guid quizId { get; set; }
}
public class StudentDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int AcademicId { get; set; }

}
