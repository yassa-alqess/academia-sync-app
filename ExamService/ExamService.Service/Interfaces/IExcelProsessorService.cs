using ExamService.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamService.Service.Interfaces;

public interface IExcelProsessorService
{
    public List<Question> ProcessExcelData(Stream ExcelData,Guid courseId);
}
