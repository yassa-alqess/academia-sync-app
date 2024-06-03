export interface RoomUsersPayload {
    userId: string;
    roomId: string;
}

export interface RoomUsersListPayload {

    userIds: string[];
    roomId: string;
}

export interface UserRoomsGetPayload {
    userId: string;
}

export interface UserRoomsGetResponse {
    rooms: Room[];
}

export interface Room {
    roomId: string;
    name: string;
    description: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoomUsersGetPayload {
    roomId: string;
}

export interface RoomUsersGetResponse {
    users: UserResponse[];
}

export interface UserResponse {
    userId: string;
    email: string;
    displayName: string;
    arabicName: string;
    role: boolean;

}
