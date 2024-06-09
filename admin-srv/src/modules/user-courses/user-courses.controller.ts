import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import UserCourseService from './user-courses.service';



export default class UserCourseController {
    constructor(private userCourseService: UserCourseService) { }
    public addCourseUser = async (req: Request, res: Response) => {
        try {
            const userCourseId = await this.userCourseService.addCourseUser(req.body);
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

    public deleteCourseUser = async (req: Request, res: Response) => {
        try {
            const userCourseId = await this.userCourseService.deleteCourseUser(req.body);
            res.status(StatusCodes.OK).json({ userCourseId });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    public getCourseUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userCourseService.getCourseUsers(req.body);
            res.status(StatusCodes.OK).json(users);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    };

    public getUserCourses = async (req: Request, res: Response) => {
        try {
            const rooms = await this.userCourseService.getUserCourses(req.body);
            res.status(StatusCodes.OK).json(rooms);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public bulkDeleteCourseUsers = async (req: Request, res: Response) => {
        try {
            const userCourseIds = await this.userCourseService.bulkDeleteCourseUsers(req.body);
            res.status(StatusCodes.OK).json({ userCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public bulkAddCourseUsers = async (req: Request, res: Response) => {
        try {
            const userCourseIds = await this.userCourseService.bulkAddCourseUsers(req.body);
            res.status(StatusCodes.CREATED).json({ userCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    // get xlsx sheet and get all the courses from it and add them to the database (all required feilds should be present in the sheet)
    public bulkAddCourseUsersBySheet = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
            }
            const courses = this.userCourseService.bulkAddCourseUsersBySheet(req.file.path, req.body); // req.file.filename
            res.status(StatusCodes.CREATED).json(courses);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

}