using ExamService.Core.Bases;
using ExamService.Core.Features.Instructors.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ExamService.Core.Features.Instructors.Queries.Models;

public class GetInstructorCoursesQueryModel:IRequest<Response<List<GetInstructorCoursesQueryResponse>>>
{
    [FromRoute]
    public Guid instructorId {  get; set; }

}
