import Material from "../models/material";

export interface SubmissionAddPayload {
    late: boolean;
    text?: string;
    studentId: string;
    assignmentId: string;
}

export interface SubmissionUpdatePayload {
    submissionId: string;
    late?: boolean;
    text?: string;
    studentId: string;
    assignmentId: string;
}

export interface SubmissionResponse {
    submissionId: string;
    draftGrade: number;
    late: boolean;
    text?: string;
    updatedAt: Date;
    createdAt: Date;
    studentId: string;
    displayName: string;
    assignmentId: string;
    materials: Material[];
}

export interface MissingSubmissionResponse {
    studentId: string;
    displayName: string;

}



