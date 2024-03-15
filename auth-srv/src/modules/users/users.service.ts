import { UserAddPayload, UserResponse, UserUpdatePayload } from "@/src/shared/interfaces"
import User from '../../shared/models/user'

export const createUser = async (payload: UserAddPayload): Promise<UserResponse> => {

    throw new Error('Not implemented')
}

export const getUser = async (userId: string): Promise<UserResponse> => {
    const user = await User.findByPk(userId)
    if (!user) throw new Error('User not found')
    throw new Error('Not implemented')
}

export const updateUser = async (payload: UserUpdatePayload): Promise<UserResponse> => {
    const { userId } = payload
    const user = await User.findByPk(userId)
    if (!user) throw new Error('User not found')
    await user.update(payload)
    throw new Error('Not implemented')
}

export const removeUser = async (userId: string): Promise<string> => {
    const user = await User.findByPk(userId)
    if (!user) throw new Error('user not found')
    await user.update({ isDeleted: true }) // soft delete
    return userId
}