using ExamService.Infrastructure.Bases;
using ExamService.Infrastructure.Interfaces;
using ExamService.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ExamService.Infrastructure
{
    public static class ModuleInfrastructureDependencies
    {
        public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection services)
        {
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<IStudentRepository,StudentRepository> ();
            services.AddTransient<IQuestionRepository,QuestionRepository> ();
            services.AddTransient<IModuleRepository,ModuleRepository> ();   
            services.AddTransient<IInstructorRepository,InstructorRepository> ();
            services.AddTransient<ICourseRepository,CourseRepository> ();
            services.AddTransient<IQuizRepository,QuizRepository> ();
            services.AddTransient<IStudentQuizzesRepository,StudentQuizzesRepository> ();
            services.AddTransient<ISubmissionsRepository, SubmissionRepository>();
            


            return services;
        }
    }
}
