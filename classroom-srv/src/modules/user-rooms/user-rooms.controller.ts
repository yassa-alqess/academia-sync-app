import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import UserRoomService from './user-rooms.service';



export default class UserRoomController {
    constructor(private readonly userRoomService: UserRoomService) { }
    public async addRoomUser(req: Request, res: Response) {
        try {
            const userRoomId = await this.userRoomService.addRoomUser(req.body);
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

    public async removeRoomUser(req: Request, res: Response) {
        try {
            const userRoomId = await this.userRoomService.removeRoomUser(req.body);
            res.status(StatusCodes.OK).json({ userRoomId });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    public async getRoomUsers(req: Request, res: Response) {
        try {
            const users = await this.userRoomService.getRoomUsers(req.body);
            res.status(StatusCodes.OK).json(users);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    public async getUserRooms(req: Request, res: Response) {
        try {
            const rooms = await this.userRoomService.getUserRooms(req.body);
            res.status(StatusCodes.OK).json(rooms);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public async bulkRemoveRoomUsers(req: Request, res: Response) {
        try {
            const userRoomIds = await this.userRoomService.bulkRemoveRoomUsers(req.body);
            res.status(StatusCodes.OK).json({ userRoomIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public async bulkAddRoomUsers(req: Request, res: Response) {
        try {
            const userRoomIds = await this.userRoomService.bulkAddRoomUsers(req.body);
            res.status(StatusCodes.CREATED).json({ userRoomIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

}