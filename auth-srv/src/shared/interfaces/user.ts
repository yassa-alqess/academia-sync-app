export interface UserAddPayload {
    email?: string;
    academicId?: string;
    displayName: string; // required
    arabicName?: string;
    gender?: boolean;
    password: string; // required
    isLocked?: boolean;
    isDeleted?: boolean;
    departmentName?: string;
    group?: string;
    role: string; // required
    lawId?: string;
}

export interface UserResponse {
    userId: string;
    email: string;
    academicId: string;
    displayName: string;
    arabicName: string;
    gender: boolean;
    isLocked: boolean;
    isDeleted: boolean;
    departmentName: string;
    group: string;
    role: string;
    lawId: string;
}
export interface UserUpdatePayload {
    userId: string; // required
    email?: string;
    academicId?: string;
    displayName?: string;
    arabicName?: string
    gender?: boolean;
    hashedPassword?: string;
    isLocked?: boolean;
    isDeleted?: boolean;
    departmentName?: string;
    group?: string;
    role?: string;
    lawId?: string;
}
