using ExamService.Core.Bases;
using ExamService.Data.Entities;
using MediatR;

namespace ExamService.Core.Features.Courses.Commnads.Models;

public class AddNewCommandModel:IRequest<Response<Course>>
{
    public string Name { get; set; }
}
