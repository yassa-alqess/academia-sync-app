using AutoMapper;
using ExamService.Core.Bases;
using ExamService.Core.Features.Students.Queries.Models;
using ExamService.Core.Features.Students.Queries.Responses;
using ExamService.Data.Entities;
using ExamService.Service.Interfaces;
using MediatR;

namespace ExamService.Core.Features.Students.Queries.Handlers;

public class GetStudentByIdHandler : ResponseHandler
                                  , IRequestHandler<GetStudentByIdQueryModel, Response<GetStudentByIdResponse>>
                                  , IRequestHandler<GetStudentCourseListQueryModel, Response<List<GetStudentListResponse>>>
{
    private readonly IStudentService _studentService;
    private readonly IMapper _mapper;

    public GetStudentByIdHandler(IStudentService studentService,IMapper mapper)
    {
        _studentService = studentService;
        _mapper = mapper;
    }

    public async Task<Response<GetStudentByIdResponse>> Handle(GetStudentByIdQueryModel request, CancellationToken cancellationToken)
    {
        var student = await _studentService.GetStudentByIdAsync(request.studentId,request.courseId);
        if (student == null)
            return NotFound<GetStudentByIdResponse>($"No Student with {request.studentId} was found!");
        var studentMapper = _mapper.Map<GetStudentByIdResponse>(student);
        return Success(studentMapper);
    }

    public async Task<Response<List<GetStudentListResponse>>> Handle(GetStudentCourseListQueryModel request, CancellationToken cancellationToken)
    {
        var studentList = await _studentService.GetStudentListAsync(request.courseId);
        if (studentList == null)
            return NotFound<List<GetStudentListResponse>>("There is no student enroll to this course yet");
        var studentListMapper = _mapper.Map<List<GetStudentListResponse>>(studentList);
        return Success(studentListMapper);
    }
}
