import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import UserRoomService from './user-rooms.service';



export default class UserRoomController {
    static async addRoomUser(req: Request, res: Response) {
        try {
            const userRoomId = await UserRoomService.addRoomUser(req.body);
            res.status(StatusCodes.CREATED).json({ userRoomId });

        }
        //eslint-disable-next-line
        catch (error: any) {
            if (error?.original?.code === '23505') {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already in room' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    static async removeRoomUser(req: Request, res: Response) {
        try {
            const userRoomId = await UserRoomService.removeRoomUser(req.body);
            res.status(StatusCodes.OK).json({ userRoomId });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    static async getRoomUsers(req: Request, res: Response) {
        try {
            const users = await UserRoomService.getRoomUsers(req.body);
            res.status(StatusCodes.OK).json(users);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    static async getUserRooms(req: Request, res: Response) {
        try {
            const rooms = await UserRoomService.getUserRooms(req.body);
            res.status(StatusCodes.OK).json(rooms);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async bulkRemoveRoomUsers(req: Request, res: Response) {
        try {
            const userRoomIds = await UserRoomService.bulkRemoveRoomUsers(req.body);
            res.status(StatusCodes.OK).json({ userRoomIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async bulkAddRoomUsers(req: Request, res: Response) {
        try {
            const userRoomIds = await UserRoomService.bulkAddRoomUsers(req.body);
            res.status(StatusCodes.CREATED).json({ userRoomIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

}