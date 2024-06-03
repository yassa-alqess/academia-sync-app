import { RoomAddPayload, RoomResponse, RoomUpdatePayload } from '@/shared/interfaces'
import Room from '../../shared/models/room'

export default class RoomService {
    constructor() { }
    static async addRoom(payload: RoomAddPayload): Promise<RoomResponse> {

        const room = await Room.create({ ...payload });
        return {
            roomId: room.roomId,
            name: room.name,
            description: room.description,
            courseId: room.courseId,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
        };
    }

    static async getRoom(roomId: string): Promise<RoomResponse> {
        const room = await Room.findByPk(roomId)
        if (!room) throw new Error('Room not found')

        return {
            roomId: room.roomId,
            name: room.name,
            description: room.description,
            courseId: room.courseId,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
        };
    }

    static async updateRoom(payload: RoomUpdatePayload): Promise<RoomResponse> {
        const { roomId } = payload
        const room = await Room.findByPk(roomId)
        if (!room) throw new Error('Room not found')
        await room.update(payload)
        return {
            roomId: room.roomId,
            name: room.name,
            description: room.description,
            courseId: room.courseId,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
        };
    }

    static async removeRoom(roomId: string): Promise<string> {
        const room = await Room.findByPk(roomId)
        if (!room) throw new Error('Room not found')
        await room.destroy()
        return roomId
    }
}