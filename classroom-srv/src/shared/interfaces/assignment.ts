import Material from "../models/material";

export interface AssignmentPayload {

    title: string;
    description?: string;
    assignedGrade: number;
    dueDate: Date;
    state: boolean;
    roomId: string;
    userId: string;

}

export interface AssignmentUpdatePayload {
    assignmentId: string;
    title?: string;
    description?: string;
    assignedGrade?: number;
    dueDate?: Date;
    state?: boolean;
    roomId: string;
    userId: string;
}

export interface AssignmentResponse {
    assignmentId: string;
    title: string;
    description: string;
    assignedGrade: number;
    dueDate: Date;
    state: boolean;
    updatedAt: Date;
    createdAt: Date;
    roomId: string;
    userId: string;
    filePath?: string; // possible null
    materials: Material[];
    // assignmentSubmissions: any;
}