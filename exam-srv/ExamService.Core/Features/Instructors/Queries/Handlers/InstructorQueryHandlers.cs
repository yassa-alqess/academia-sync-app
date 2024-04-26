using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Instructors.Queries.Models;
using ExamService.Core.Features.Instructors.Queries.Responses;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Instructors.Queries.Handlers;

public class InstructorQueryHandlers:ResponseHandler
                                    ,IRequestHandler<GetInstructorByIdQueryModel,Response<GetInstructorByIdResponse>>
                                    ,IRequestHandler<GetInstructorCoursesQueryModel,Response<List<GetInstructorCoursesQueryResponse>>>
{
    #region Fields
    private readonly IMapper _mapper;
    private readonly IInstructorService _instructorService;
    #endregion
    #region Constructors
    public InstructorQueryHandlers(IMapper mapper,IInstructorService instructorService)
    {
        _mapper = mapper;
        _instructorService = instructorService;
    }
    #endregion
    #region Methods
    public async Task<Response<GetInstructorByIdResponse>> Handle(GetInstructorByIdQueryModel request, CancellationToken cancellationToken)
    {
        var existingInstructor = await _instructorService.GetInstructorByIdAsync(request.Id);
        if (existingInstructor == null)
            return NotFound <GetInstructorByIdResponse>($"No instructor founded with acossiated Id {request.Id}");
        var instructorMapped = new GetInstructorByIdResponse()
        {
            
            DisplayName=existingInstructor.DisplayName
        };
        return Success(instructorMapped); 
    }

    public async Task<Response<List<GetInstructorCoursesQueryResponse>>> Handle(GetInstructorCoursesQueryModel request, CancellationToken cancellationToken)
    {
        var inquiredCourses= await _instructorService.GetInstructorCourses(request.instructorId);
        if (!inquiredCourses.Any())
            return NotFound<List<GetInstructorCoursesQueryResponse>>("Instructor has not enrolled in any course yet.");
        var coursesMapped = _mapper.Map<List<GetInstructorCoursesQueryResponse>>(inquiredCourses);
        return Success(coursesMapped);
    }
    #endregion

}
