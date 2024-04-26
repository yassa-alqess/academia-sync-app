using ExamService.API.Base;
using ExamService.Core.Features.Students.Command.Models;
using ExamService.Core.Features.Students.Queries.Models;
using ExamService.Data.MetaData;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.API.Controllers
{
    [ApiController]
    public class StudentController : ApplicationController
    {
        [HttpGet(Router.StudentRouting.StudentCourseList)]
        public async Task<IActionResult> GetStudentCourseListAsync(Guid courseId)
        {
            var response =await Mediator.Send(new GetStudentCourseListQueryModel() { courseId=courseId});
            return NewResult(response);
        }
        [HttpGet(Router.StudentRouting.GetById)]
        public async Task<IActionResult> GetStudentByIdAsync(Guid courseId,Guid studentId)
        {
            var response= await Mediator.Send(new GetStudentByIdQueryModel() { studentId = studentId,courseId=courseId });
            return NewResult(response);
        }
        [HttpPost(Router.StudentRouting.EnrollToQuiz)]
        public async Task<IActionResult> EnrollToQuiz([FromBody] EnrollToQuizCommandModel command)
        {
            var response=await Mediator.Send(command);
            return NewResult(response);
        }
        [HttpPost(Router.StudentRouting.SubmitQuiz)]
        public async Task<IActionResult> SubmitQuiz([FromBody] SubmitQuizAnswersCommandModel command)
        {
            var response = await Mediator.Send(command);
            return NewResult(response);
        }
    }
}
