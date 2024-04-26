using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Instructors.Command.Models;
using ExamService.Data.Entities;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Instructors.Command.Handlers;

public class InstructorCommandHandler : ResponseHandler, IRequestHandler<AddInstructorCommandModel, Response<Instructor>>
{
    #region Fields
    private readonly IMapper _mapper;
    private readonly IInstructorService _instructorService;
    #endregion
    #region Constructor
    public InstructorCommandHandler(IMapper mapper,IInstructorService instructorService)
    {
        _mapper = mapper;
        _instructorService = instructorService;
    }
    #endregion
    #region Methods
    public async Task<Response<Instructor>> Handle(AddInstructorCommandModel request, CancellationToken cancellationToken)
    {
        var instructorMapped = new Instructor()
        { 
            DisplayName = request.DisplayName,
            
        };//Course not handle yet !!!
        var InstructorAdded=await _instructorService.AddInstructorAsync(instructorMapped);
        if(InstructorAdded !=null)
        {
            return Created<Instructor>(InstructorAdded);
        }
        return UnprocessableEntity<Instructor>("Unable to process your request,try again");
    }
    #endregion



}
