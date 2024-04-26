using ExamService.API.Base;
using ExamService.Core.Features.Quizzes.Commands.Models;
using ExamService.Core.Features.Quizzes.Queries.Models;
using ExamService.Data.MetaData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.API.Controllers;

[Authorize]
[ApiController]
public class QuizController : ApplicationController
{
    [HttpPost(Router.QuizRouting.CreateQuiz)]
    public async Task<IActionResult> CreateQuiz(Guid instructorId, Guid courseId, CreateQuizCommandModel quizMetaData)
    {
        quizMetaData.instructorId = instructorId;
        quizMetaData.courseId = courseId;
        var response = await Mediator.Send(quizMetaData);
        return NewResult(response);
    }
    [HttpGet(Router.QuizRouting.GetAllCourseQuizzes)]
    public async Task<IActionResult> GetAllCourseQuizzes(Guid instructorId, Guid courseId)
    {
        var command = new GetAllCourseQuizzesCommandModel { courseId = courseId, instructorId = instructorId };
        var response = await Mediator.Send(command);
        return NewResult(response);
    }
    [HttpGet(Router.QuizRouting.GetById)]
    public async Task<IActionResult> GetQuizById(Guid quizId)
    {
        var response = await Mediator.Send(new GetQuizByIdQueryModel { quizId = quizId });
        return NewResult(response);
    }
    [HttpPut(Router.QuizRouting.UpdateQuiz)]
    public async Task<IActionResult> UpdateQuiz(Guid courseId, Guid instructorId, Guid quizId, [FromForm] UpdateQuizMetaDataCommandModel command)
    {
        var response = await Mediator.Send(new UpdateQuizMetaDataCommandModel { quizId = quizId, instructorId = instructorId, courseId = courseId });
        return NewResult(response);
    }
    [HttpPost(Router.QuizRouting.ViewQuizDetails)]
    public async Task<IActionResult> ViewQuizDetails([FromQuery] Guid quizId)
    {
        var response = await Mediator.Send(new ViewQuizDetailsQueryModel { quizId = quizId });
        return NewResult(response);
    }
    [HttpPost(Router.QuizRouting.IncomingQuizzes)]
    public async Task<IActionResult> GetIncomingQuizzesList([FromBody] GetIncomingCourseQuizzesQueryModel command)
    {
        var response = await Mediator.Send(command);
        return NewResult(response);
    }
}
