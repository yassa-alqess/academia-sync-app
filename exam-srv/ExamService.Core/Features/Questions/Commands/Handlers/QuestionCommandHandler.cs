using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Questions.Command.Models;
using ExamService.Core.Features.Questions.Commands.Models;
using ExamService.Data.Entities;
using ExamService.Data.Helpers.Enums;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Questions.Command.Handlers;

public class QuestionCommandHandler : ResponseHandler
                                    ,IRequestHandler<AddQuestionCommandModel, Response<Question>>
                                    ,IRequestHandler<AddQuestionBankCommandModel, Response<string>>
                                    ,IRequestHandler<UpdateQuestionCommandModel, Response<string>>
                                    ,IRequestHandler<UpdateBulkQuestionsCommandModel, Response<string>>
                                    ,IRequestHandler<DeleteQuestionCommandModel, Response<string>>
                                    ,IRequestHandler<DeleteBulkQuestionsCommandModel,Response<string>>
{
    #region Fields
    private readonly IQuestionService _questionService;
    private readonly IExcelProsessorService _excelProsessorService;
    private readonly IMapper _mapper;
    #endregion
    #region Constructors
    public QuestionCommandHandler(IQuestionService questionService,IMapper mapper,IExcelProsessorService excelProsessorService)
    {
        _excelProsessorService=excelProsessorService;
        _questionService = questionService;
        _mapper = mapper;
    }
    #endregion
    #region Methods
    public async Task<Response<Question>> Handle(AddQuestionCommandModel request, CancellationToken cancellationToken)
    {
        var existingQuestion = await _questionService.GetQuestionByName(request.Text,request.courseId);
        if(existingQuestion is not null)
            return UnprocessableEntity<Question>("This question already exist!");
        var questionMapper = _mapper.Map<Question>(request);
        var questionAdded = await _questionService.AddQuestionAsync(questionMapper);
        if (questionAdded != null) 
            return Created(questionAdded);

        return BadRequest(questionMapper);
    }
    public async Task<Response<string>> Handle(AddQuestionBankCommandModel request, CancellationToken cancellationToken)
    {

        if (request.ExcelBankSheet == null || request.ExcelBankSheet.Length == 0)
        {
            return UnprocessableEntity<string>("This file is empty,unable to process it."); ;
        }
        using (var stream = request.ExcelBankSheet.OpenReadStream())
        {
            var questions = _excelProsessorService.ProcessExcelData(stream, request.courseId);
            if (questions != null)
            {
                List<Question> addedQuestions = [];
                foreach (var question in questions)
                {
                    var existingQuestion = await _questionService.GetQuestionByName(question.Text,question.CourseId);
                    if (existingQuestion is not null)
                        continue;
                    addedQuestions.Add(question);
                }
                if (addedQuestions.Count > 0)
                {
                    await _questionService.AddBulkQuestionsAsync(addedQuestions);
                    return Success("Questions uploaded successfully");
                }
                return UnprocessableEntity<string>("This questions list is already exsited");
            }
            return BadRequest("Error occure while uploading file , try it again!!");
        }
    }

    public async Task<Response<string>> Handle(UpdateQuestionCommandModel request, CancellationToken cancellationToken)
    {
        
        var existedQuestion =await _questionService.GetQuestionByIdAsync(request.questionId);
        if (existedQuestion != null)
        {
            var questionMapped= _mapper.Map<Question>(request);
            

            await _questionService.UpdateQuestionAsync(questionMapped);
                return Success("The question is successfully updated");
        }
        return BadRequest("Unable to process your request");
    }

    public async Task<Response<string>> Handle(UpdateBulkQuestionsCommandModel request, CancellationToken cancellationToken)
    {
        List<Question> updatedQuestions = [];
        foreach (var updatedQuestion in request.updatedQuestions)
        {
            var existedQuestion = await _questionService.GetQuestionByIdAsync(updatedQuestion.questionId);
            if (existedQuestion != null)
            {
                existedQuestion = _mapper.Map<Question>(updatedQuestion);
                updatedQuestions.Add(existedQuestion);
            }
            else
                return NotFound<string>("Something wrong,one or more questions you are trying to update in not founded!!");
        }
        await _questionService.UpdateBulkQuestionsAsync(updatedQuestions);
        return Success<string>("The list is successfully updated");
    }

    public async Task<Response<string>> Handle(DeleteQuestionCommandModel request, CancellationToken cancellationToken)
    {
        var existingQuestion=await _questionService.GetQuestionByIdAsync(request.questionId);
        if(existingQuestion!=null)
        {
           await _questionService.DeleteQuestionAsync(existingQuestion);
            return Deleted<string>();
        }
        return BadRequest("something occurred while deleteing process,Try again");
    }

    public async Task<Response<string>> Handle(DeleteBulkQuestionsCommandModel request, CancellationToken cancellationToken)
    {
        List<Question> deletedQuestionsList = [];
        foreach(var deletedQuestion in request.deletedQuestions)
        {
            var existingQuestion = await _questionService.GetQuestionByIdAsync(deletedQuestion.questionId);
            if (existingQuestion is null)
                continue;
            else
            {
                deletedQuestionsList.Add(existingQuestion);
            }
        }
        if (deletedQuestionsList.Count > 0)
        {
            await _questionService.DeleteBulkQuestionsAsync(deletedQuestionsList);
            return Deleted<string>();
        }
        else
            return BadRequest<string>("The questions list is not vaild to be deleted");
    }
    #endregion
}
