using ExamService.Core.Bases;
using ExamService.Data.Entities;
using MediatR;

namespace ExamService.Core.Features.Instructors.Command.Models;

public class AddInstructorCommandModel:IRequest<Response<Instructor>>
{
    public string DisplayName { get; set; }
    public string CourseName { get; set; }
}
