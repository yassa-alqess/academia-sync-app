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
    users: UserResponse[];
}

export interface UserResponse {
    userId: string;
    email: string;
    displayName: string;
    arabicName: string;
    role: boolean;

}

export interface Course {
    courseId: string;
    name: string;
    grades: number;
    creditHours: number;
}
