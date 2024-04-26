using ExamService.Core.Bases;
using ExamService.Core.Features.Quizzes.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Quizzes.Queries.Models
{
    public class GetQuizByIdQueryModel: IRequest<Response<GetQuizByIdQueryResponse>>
    {
        [FromQuery]
        public Guid quizId { get; set; }
    }
}
