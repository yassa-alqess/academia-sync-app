import { StatusCodes } from 'http-status-codes';
import RoomService from './rooms.service';
import { Request, Response } from 'express';

export default class RoomController {
    constructor() { }
    static async addRoom(req: Request, res: Response) {
        try {
            const room = await RoomService.addRoom(req.body);
            res.status(StatusCodes.CREATED).json(room);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Room already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
            // next(error);
        }
    }

    static async updateRoom(req: Request, res: Response) {
        try {
            const room = await RoomService.updateRoom(req.body);
            res.status(StatusCodes.OK).json(room);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid roomId' });
            }
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Room already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async getRoom(req: Request, res: Response) {
        try {
            const { roomId } = req.body;
            const room = await RoomService.getRoom(roomId);
            res.status(StatusCodes.OK).json(room);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid roomId' });
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        }
    }


    static async removeRoom(req: Request, res: Response) {
        try {
            const { roomId } = req.body;
            await RoomService.removeRoom(roomId);
            res.status(StatusCodes.OK).json({ roomId });
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid roomId' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}

