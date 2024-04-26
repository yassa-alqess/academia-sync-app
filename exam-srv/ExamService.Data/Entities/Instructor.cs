﻿using System.ComponentModel.DataAnnotations;

namespace ExamService.Data.Entities;

public class Instructor
{
    [Key]
    public Guid Id { get; set; }
    public string DisplayName { get; set; }
    public ICollection<Quiz> Quizs { get; set; }
    public ICollection<InstructorCourses> InstructorCourses { get; set; }
}
