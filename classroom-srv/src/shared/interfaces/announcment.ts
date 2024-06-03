import Material from "../models/material";

export interface AnnouncmentPayload {
    text: string;
    state: boolean;
    assigneeMode: boolean;
    roomId: string;
    userId: string;
}

export interface AnnouncmentUpdatePayload {
    announcmentId: string;
    text?: string;
    state?: boolean;
    assigneeMode?: boolean;
    roomId: string;
    userId: string;
}

export interface AnnouncmentResponse {
    announcmentId: string;
    text: string;
    state: boolean;
    updatedAt: Date;
    createdAt: Date;
    assigneeMode: boolean;
    // filePath?: string; // possible null
    materials: Material[];
    roomId: string;
    userId: string;
}