export interface LawCoursesPayload {
    lawId: string;
    courseId: string;
}

export interface LawCoursesListPayload {

    lawId: string;
    courseIds: string[];
}

export interface LawCoursesGetPayload {
    lawId: string;
}

export interface LawCoursesGetResponse {
    courses: Course[];
}

export interface Course {
    courseId: string;
    name: string;
    grades: number;
    creditHours: number;
}
