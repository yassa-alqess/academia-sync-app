export interface LawAddPayload {
    name: string; // required
    capacity: number; // required
    enrolledStudents?: number;
    isDeleted?: boolean;
    description?: string;
}

export interface LawUpdatePayload {
    lawId: string; // required
    name?: string;
    capacity?: number;
    enrolledStudents?: number;
    isDeleted?: boolean;
}

export interface LawResponse {
    lawId: string;
    name: string;
    capacity: number;
    enrolledStudents: number;
    isDeleted: boolean;
}