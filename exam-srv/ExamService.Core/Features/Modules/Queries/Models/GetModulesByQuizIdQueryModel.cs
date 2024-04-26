using ExamService.Core.Bases;
using ExamService.Core.Features.Modules.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamService.Core.Features.Modules.Queries.Models
{
    public class GetModulesByQuizIdQueryModel:IRequest<Response<List<GetModulesByQuizIdQueryResponse>>>
    {
        [FromRoute]
        public Guid quizId { get; set; }
    }
}
