using ExamService.API.Base;
using ExamService.Core.Features.Instructors.Command.Models;
using ExamService.Core.Features.Instructors.Queries.Models;
using ExamService.Data.MetaData;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.API.Controllers;

[ApiController]
public class InstructorController : ApplicationController
{
    [HttpPost(Router.InstructorRouting.AddInstructor)]
    public async Task<IActionResult> AddInstructor([FromBody] AddInstructorCommandModel newInstructor)
    {
        var response=await Mediator.Send(newInstructor);
        return NewResult(response);
    }
    [HttpGet(Router.InstructorRouting.GetById)]
    public async Task<IActionResult> GetById([FromBody] GetInstructorByIdQueryModel queryInstructor)
    {
        var response= await Mediator.Send(queryInstructor);
        return NewResult(response);
    }
    [HttpGet(Router.InstructorRouting.InstructorCourses)]
    public async Task<IActionResult> GetInstructorCourses([FromRoute] Guid instructorId)
    {
        var response=await Mediator.Send(new GetInstructorCoursesQueryModel { instructorId=instructorId });
        return NewResult(response);
    }
}
