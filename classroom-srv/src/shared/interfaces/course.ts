export interface CourseAddPayload {
    name: string;
    grades: number;
    creditHours: number;
}


export interface CourseUpdatePayload {
    courseId: string;
    name?: string;
    grades?: number;
    creditHours?: number;
}

export interface CourseResponse {
    courseId: string;
    name: string;
    grades: number;
    creditHours: number;
}