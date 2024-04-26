using ExamService.Core.Bases;
using ExamService.Data.Entities;
using MediatR;

namespace ExamService.Core.Features.Students.Command.Models;

public class AddStudentListCommandModel:IRequest<Response<string>>
{
    public List<Student> students {  get; set; }
    public List<Guid> scourseIds { get; set; }
}
