using ExamService.API.Base;
using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Core.Features.Questions.Commands.Models;
using ExamService.Core.Features.Questions.Queries.Models;
using ExamService.Data.MetaData;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.API.Controllers;

    [ApiController]
    public class QuestionController : ApplicationController
    {
       
        [HttpPost(Router.QuestionRouting.AddQuestion)]
        public async Task<IActionResult> AddQuestion(Guid courseId, [FromForm] AddQuestionCommandModel question)
        {
            question.courseId=courseId;
            var response=await Mediator.Send(question);
            return NewResult(response);
        }

        [HttpPost(Router.QuestionRouting.AddQuestionsBank)]
        public async Task<IActionResult> AddQuestionsBankAync( IFormFile bankSheet, Guid courseId)
        {
            var response = await Mediator.Send(new AddQuestionBankCommandModel() { ExcelBankSheet = bankSheet,courseId=courseId});
            return NewResult(response);
        }

        [HttpGet(Router.QuestionRouting.GetById)]
        public async Task<IActionResult> GetById(Guid questionId,Guid courseId)
        {
            var response= await Mediator.Send(new GetQuestionByIdQueryModel() { questionId = questionId,courseId=courseId});
            return NewResult(response);
        }
        
        [HttpGet(Router.QuestionRouting.QuestionsList)]
        public async Task<IActionResult> GetAllQuestionsBank(Guid courseId)
        {
            var response = await Mediator.Send(new GetAllQuestionsQueryModel { courseId=courseId});
            return NewResult(response);
        }

        [HttpPut(Router.QuestionRouting.UpdateQuestion)]
        public async Task<IActionResult> UpdateQuestionAsync(Guid courseId ,Guid questionId,[FromForm] UpdateQuestionCommandModel updatedQuestion)
        {
            updatedQuestion.CourseId = courseId;
            updatedQuestion.questionId = questionId;
            var response =await Mediator.Send(updatedQuestion);
            return NewResult(response);
        }

        [HttpPut(Router.QuestionRouting.UpdateQuestionsList)]
        public async Task<IActionResult> UpdateQuestionsList(Guid courseId,List<UpdateQuestionCommandModel> updatedQuestions)
        {
            var command=new UpdateBulkQuestionsCommandModel() { updatedQuestions=updatedQuestions,CourseId=courseId};
            var response=await Mediator.Send(command);
        return NewResult(response);
        }

        [HttpDelete(Router.QuestionRouting.DeleteQuestion)]
        public async Task<IActionResult> DeleteQuestion(Guid courseId, DeleteQuestionCommandModel deletedQuestion)
        {
            deletedQuestion.courseId = courseId;
            var response = await Mediator.Send(deletedQuestion);
            return NewResult(response);
        }

        [HttpDelete(Router.QuestionRouting.DeleteQuestionsList)]
        public async Task<IActionResult> DeleteQuestionList(Guid courseId, List<DeleteQuestionCommandModel> deletedQuestions)
        {
            var command = new DeleteBulkQuestionsCommandModel() { deletedQuestions = deletedQuestions,courseId=courseId };
            var response = await Mediator.Send(command);
            return NewResult(response);
        }
}

