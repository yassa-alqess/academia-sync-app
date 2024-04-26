using ExamService.API.Base;
using ExamService.Core.Features.Modules.Commands.Models;
using ExamService.Core.Features.Modules.Queries.Models;
using ExamService.Data.Entities;
using ExamService.Data.MetaData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.API.Controllers;

[ApiController]
public class ModuleController : ApplicationController
{
    [HttpPost(Router.ModuleReouting.GenerateModuels)]
    public async Task<IActionResult> GenerateModules(Guid courseId, Guid instructorId, GenerateQuizModulesCommandModel generateData)
    {
        generateData.courseId = courseId;
        generateData.instructorId = instructorId;
        var response = await Mediator.Send(generateData);
        return NewResult(response);
    }
    [HttpGet(Router.QuizRouting.GetQuizModules)]
    public async Task<IActionResult> GetQuizModules(Guid quizId)
    {
        var quizQuery = new GetModulesByQuizIdQueryModel() { quizId = quizId };
        var response = await Mediator.Send(quizQuery);
        return NewResult(response);
    }
    [HttpGet(Router.ModuleReouting.GetById)]
    public async Task<IActionResult> GetModuleById([FromQuery] Guid moduleId)
    {
        var response= await Mediator.Send(new GetModuleByIdQueryModel(){ moduleId=moduleId});
        return NewResult(response);
    }
    [HttpPost(Router.ModuleReouting.PublishModules)]
    public async Task<IActionResult> PublishModules(Guid quizId,Guid courseId, List<StudentDto> students)
    {
        var command = new PublishModulesCommandModel { courseId = courseId, quizId = quizId , students=students };
        var response=await Mediator.Send(command);
        return NewResult(response);
    }
}

