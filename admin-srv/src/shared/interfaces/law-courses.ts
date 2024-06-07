import { CourseResponse } from "./course";

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
    courses: CourseResponse[];
}
