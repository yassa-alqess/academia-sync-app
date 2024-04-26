
namespace ExamService.Data.MetaData;

public static class Router
{
    public const string RouteName = "Api";
    public const string Version = "V0.1";
    public const string GeneralRule = RouteName + "/" + Version + "/";

    public static class StudentRouting
    {
        public const string Prefix = GeneralRule + "courses/{courseId}/Quizzes/{quizId}/students";
        public const string StudentCourseList = GeneralRule + "courses/{courseId}/students/List";
        public const string GetById = Prefix + "/{studentId}";
        public const string EnrollToQuiz = Prefix + "/{studentId}/Enroll";
        public const string SubmitQuiz = Prefix + "/{studentId}/modules/{moduleId}/Submit";
    }

    public static class QuestionRouting
    {
        public const string Prefix = GeneralRule + "courses/{courseId}/questions";
        public const string QuestionsList = Prefix + "/List";
        public const string GetById = Prefix + "/{questionId}";
        public const string AddQuestion = Prefix + "/AddQuestion";
        public const string AddQuestionsBank = Prefix + "/AddQuestionsBank";
        public const string UpdateQuestion = Prefix + "/UpdateQuestion/{questionId}";
        public const string UpdateQuestionsList = Prefix + "/UpdateQuestionsList";
        public const string DeleteQuestion = Prefix + "/DeleteQuestion/{questionId}";
        public const string DeleteQuestionsList = Prefix + "/DeleteQuestionsList";
    }


    public static class InstructorRouting
    {
        public const string Prefix = GeneralRule + "instructors";
        public const string AddInstructor = Prefix + "/AddInstructor";
        public const string GetById = Prefix + "/{instructorId}";
        public const string InstructorCourses = Prefix + "/{instructorId}/courses";
    }

    public static class CourseRouting
    {
        public const string Prefix = GeneralRule + "courses";
        public const string AddCourse = Prefix + "/AddCourse";
        public const string GetById = Prefix + "/{courseId}";
    }

    public static class ModuleReouting
    {
        public const string Prefix = GeneralRule + "courses/{courseId}/instructors/{instructorId}/modules";
        public const string GenerateModuels = Prefix + "/GenerateModules";
        public const string GetById = Prefix + "/{moduleId}";
        public const string PublishModules = Prefix + "/{quizId}/PublishModules";
    }

    public static class QuizRouting
    {
        public const string Prefix = GeneralRule + "courses/{courseId}/instructors/{instructorId}/quizzes";
        public const string CreateQuiz = Prefix + "/createquiz";
        public const string GetQuizModules = Prefix + "/{quizId}/modules/List";
        //for web Get request
        public const string GetById = Prefix + "/{quizId}/Details";
        //for mobile post request
        public const string ViewQuizDetails = Prefix + "/{quizId}/Details";
        public const string GetAllCourseQuizzes = Prefix + "/List";
        public const string UpdateQuiz = Prefix + "/{quizId}";
        public const string IncomingQuizzes = GeneralRule + "courses/{courseId}/quizzes/incommingList";
    }

}
