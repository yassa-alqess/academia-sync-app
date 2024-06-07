
import Room from '../../shared/models/room'
import UserRoom from '../../shared/models/user-room'
import { RoomUsersGetResponse, RoomUsersListPayload, RoomUsersPayload, UserRoomsGetPayload, UserResponse, UserRoomsGetResponse, RoomUsersGetPayload } from '../../shared/interfaces/room-users'
import User from '../../shared/models/user'

export default class UserRoomService {

    public async addRoomUser(payload: RoomUsersPayload): Promise<string> { //add user to room
        const room = await Room.findByPk(payload.roomId)
        if (!room) throw new Error('Room not found')
        const user = await User.findByPk(payload.userId)
        if (!user) throw new Error('User not found')
        if (await UserRoom.findOne({ where: { userId: payload.userId, roomId: payload.roomId } })) {
            throw new Error('User already in room')
        }
        const record = await UserRoom.create({ userId: payload.userId, roomId: payload.roomId })
        return record.userRoomId
    }

    public async removeRoomUser(payload: RoomUsersPayload): Promise<string> { //remove user from room
        const room = await Room.findByPk(payload.roomId)
        if (!room) throw new Error('Room not found')
        const user = await User.findByPk(payload.userId)
        if (!user) throw new Error('User not found')
        const record = await UserRoom.findOne({ where: { userId: payload.userId, roomId: payload.roomId } })
        if (!record) throw new Error('User not in room already')
        await record.destroy()
        return record.userRoomId
    }

    public async bulkRemoveRoomUsers(payload: RoomUsersListPayload): Promise<string> { // remove users from room
        const room = await Room.findByPk(payload.roomId)
        if (!room) throw new Error('Room not found')

        const users = await User.findAll({ where: { userId: payload.userIds } }) //array of users
        if (users.length !== payload.userIds.length) throw new Error('Some users not found')

        const records = await Promise.all(payload.userIds.map(async userId => {
            const record = await UserRoom.findOne({ where: { userId, roomId: payload.roomId } })
            if (!record) throw new Error('User not in room already')
            await record.destroy()
            return record.userRoomId
        }
        ))
        return records.join(',')
    }

    public async bulkAddRoomUsers(payload: RoomUsersListPayload): Promise<string> { // add users to room
        const room = await Room.findByPk(payload.roomId)
        if (!room) throw new Error('Room not found')

        const users = await User.findAll({ where: { userId: payload.userIds } }) //array of users
        if (users.length !== payload.userIds.length) throw new Error('Some users not found')

        const records = await Promise.all(payload.userIds.map(async userId => {
            if (await UserRoom.findOne({ where: { userId, roomId: payload.roomId } })) {
                throw new Error('User already in room')
            }
            return await UserRoom.create({ userId, roomId: payload.roomId })
        }
        ))
        return records.map(record => record.userRoomId).join(',')

    }

    public async getRoomUsers(payload: RoomUsersGetPayload): Promise<RoomUsersGetResponse> {
        const room = await Room.findByPk(payload.roomId)
        if (!room) throw new Error('Room not found')

        const records = await UserRoom.findAll({ where: { roomId: payload.roomId } })
        const users = await Promise.all(records.map(async record => {
            const user = await User.findByPk(record.studentId) as User // possible null
            return {
                userId: user.userId,
                email: user.email,
                displayName: user.displayName,
                arabicName: user.arabicName,
                role: user.role
            } as UserResponse
        }))
        return { users }
    }

    public async getUserRooms(payload: UserRoomsGetPayload): Promise<UserRoomsGetResponse> {
        const user = await User.findByPk(payload.userId)
        if (!user) throw new Error('User not found')

        const records = await UserRoom.findAll({ where: { userId: payload.userId } })
        const rooms = await Promise.all(records.map(async record => {
            const room = await Room.findByPk(record.roomId) as Room // possible null
            return {
                roomId: room.roomId,
                name: room.name,
                description: room.description,
                courseId: room.courseId,
                createdAt: room.createdAt,
                updatedAt: room.updatedAt
            }
        }))
        return { rooms }
    }
}