using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Courses.Commnads.Models;
using ExamService.Core.Features.Courses.Queries.Models;
using ExamService.Core.Features.Courses.Queries.Responses;
using ExamService.Data.Entities;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Courses.Commnads.Handlers;
public class CourseCommandHandler:ResponseHandler
                                 ,IRequestHandler<AddNewCommandModel,Response<Course>>
                                 ,IRequestHandler<GetByIdQueryModel,Response<GetByIdResponse>>
{
    #region Fields
    private readonly IMapper _mapper;
    private readonly ICourseService _courseService;
    #endregion
    #region Constructors
    public CourseCommandHandler(IMapper mapper,ICourseService courseService)
    {
        _mapper = mapper;
        _courseService = courseService;
    }
    #endregion
    #region Methods

    public async Task<Response<Course>> Handle(AddNewCommandModel request, CancellationToken cancellationToken)
    {
        var courseMapped= new Course() { Name = request.Name };
        var courseAdded = await _courseService.AddNew(courseMapped);
        if(courseAdded != null)
            return Created<Course>(courseAdded);
        return UnprocessableEntity<Course>("Unable to process your request,try again");
    }

    public async Task<Response<GetByIdResponse>> Handle(GetByIdQueryModel request, CancellationToken cancellationToken)
    {
        var exitingCourse=await _courseService.GetById(request.Id);
        var courseMapped=new GetByIdResponse() { Name=exitingCourse.Name};
        if (exitingCourse != null)
            return Success(courseMapped);
        return NotFound<GetByIdResponse>($"No Course with {request.Id} was found!");
    }
    #endregion
}

