﻿using System.ComponentModel.DataAnnotations;

namespace ExamService.Data.Entities;

public class ModuleQuestion
{
    [Key]
    public Guid ModuleId { get; set; }
    public Module Module { get; set; }
    [Key]
    public Guid QuestionId { get; set; }
    public Question Question { get; set; }
    
}
