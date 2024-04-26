using ExamService.Service.Interfaces;
using ExamService.Service.Services;
using Microsoft.Extensions.DependencyInjection;
using OfficeOpenXml;

namespace ExamService.Service
{
    public static class ModuleServiceDependencies
    {
        public static IServiceCollection AddServiceDependencies(this IServiceCollection services)
        {
            services.AddTransient<IStudentService, StudentService>();
            services.AddTransient<IQuestionService, QuestionService>();
            services.AddTransient<IExcelProsessorService, ExcelProsessorService>();
            services.AddTransient<IInstructorService, InstructorService>();
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<IQuizService, QuizService>();
            services.AddTransient<IModuleService, ModuleService>();
            services.AddTransient<ISubmissionService, SubmissionService>();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            return services;
        }
    }
}
