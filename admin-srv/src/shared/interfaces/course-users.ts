// import { UserResponse } from "./user";

export interface CourseUsersPayload {
    userId: string;
    courseId: string;
}

export interface CourseUsersListPayload {

    userIds: string[];
    courseId: string;
}

export interface UserCoursesGetPayload {
    userId: string;
}

export interface UserCoursesGetResponse {
    courses: Course[];
}

export interface CourseUsersGetPayload {
    courseId: string;
}

export interface CourseUsersGetResponse {
    // users: Partial<UserResponse>[];
    users: PartialUserResponse[];
}

export interface PartialUserResponse {
    userId: string;
    email: string;
    displayName: string;
    arabicName: string;
    role: number;

}

export interface Course {
    courseId: string;
    name: string;
    grades: number;
    creditHours: number;
}
