using ExamService.API.Base;
using ExamService.Core.Features.Courses.Commnads.Models;
using ExamService.Core.Features.Courses.Queries.Models;
using ExamService.Data.MetaData;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.API.Controllers
{
    [ApiController]
    public class CourseController : ApplicationController
    {
        [HttpPost(Router.CourseRouting.AddCourse)]
        public async Task<IActionResult> AddCourse(AddNewCommandModel courseadded)
        {
            var response =await Mediator.Send(courseadded);
            return NewResult(response);
        }
        [HttpGet(Router.CourseRouting.GetById)]
        public async Task<IActionResult> GetById(GetByIdQueryModel CourseQuery)
        {
            var response= await Mediator.Send(CourseQuery);
            return NewResult(response);
        }
    }
}
