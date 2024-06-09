// import { UserResponse } from "./user";

export interface CourseUsersPayload {
    courseId: string;
    studentId?: string;
    instructorId?: string;
    role: number;
}

export interface CourseUsersListPayload {

    studentIds?: string[];
    instructorIds?: string[];
    courseId: string;
    role: number;
}

export interface UserCoursesGetPayload {
    studentId?: string;
    instructorId?: string;
    role: number;
}

export interface UserCoursesGetResponse {
    courses: Course[];
}

export interface CourseUsersGetPayload {
    courseId: string;
    role: number;
}

export interface CourseUsersGetResponse {
    // users: Partial<UserResponse>[];
    users: PartialUserResponse[];
}

export interface PartialUserResponse {
    studentId?: string | null;
    instructorId?: string | null;
    displayName: string;

    role: number;

}

export interface Course {
    courseId: string;
    name: string;
    grades: number;
    creditHours: number;
}
