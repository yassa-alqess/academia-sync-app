export interface RoomAddPayload {
    name: string;
    description: string;
    courseId: string;
    // do we need image and capacity ?
}


export interface RoomUpdatePayload {
    roomId: string;
    name?: string;
    description?: string;
    courseId?: string;
}

export interface RoomResponse {
    roomId: string;
    name: string;
    description: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
}