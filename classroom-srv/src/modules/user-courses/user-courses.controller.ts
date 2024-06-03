import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import UserCourseService from './user-courses.service';



export default class UserCourseController {
    static async addCourseUser(req: Request, res: Response) {
        try {
            const userCourseId = await UserCourseService.addCourseUser(req.body);
            res.status(StatusCodes.CREATED).json({ userCourseId });

        }
        //eslint-disable-next-line
        catch (error: any) {
            if (error?.original?.code === '23505') {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already in room' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    static async removeCourseUser(req: Request, res: Response) {
        try {
            const userCourseId = await UserCourseService.removeCourseUser(req.body);
            res.status(StatusCodes.OK).json({ userCourseId });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    static async getCourseUsers(req: Request, res: Response) {
        try {
            const users = await UserCourseService.getCourseUsers(req.body);
            res.status(StatusCodes.OK).json(users);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    static async getUserCourses(req: Request, res: Response) {
        try {
            const rooms = await UserCourseService.getUserCourses(req.body);
            res.status(StatusCodes.OK).json(rooms);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async bulkRemoveCourseUsers(req: Request, res: Response) {
        try {
            const userCourseIds = await UserCourseService.bulkRemoveCourseUsers(req.body);
            res.status(StatusCodes.OK).json({ userCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async bulkAddCourseUsers(req: Request, res: Response) {
        try {
            const userCourseIds = await UserCourseService.bulkAddCourseUsers(req.body);
            res.status(StatusCodes.CREATED).json({ userCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

}