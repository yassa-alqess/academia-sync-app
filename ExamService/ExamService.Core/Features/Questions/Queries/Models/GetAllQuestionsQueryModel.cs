using ExamService.Core.Bases;
using ExamService.Core.Features.Questions.Queries.Response;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Questions.Queries.Models;

public class GetAllQuestionsQueryModel:IRequest<Response<List<GetAllQuestionsQueryResponse>>>
{
    [FromRoute]
    public Guid courseId { get; set; }
}
