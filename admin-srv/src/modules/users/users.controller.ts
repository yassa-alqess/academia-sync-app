import { StatusCodes } from 'http-status-codes';
import UserService from './users.service';
import { Request, Response } from 'express';

export default class UserController {
    constructor(private readonly courseService: UserService) { }


    public addUser = async (req: Request, res: Response) => {
        try {
            const course = await this.courseService.addUser(req.body);
            res.status(StatusCodes.CREATED).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
            // next(error);
        }
    }

    // get xlsx sheet and get all the courses from it and add them to the database (all required feilds should be present in the sheet)
    public bulkAddStudents = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
            }
            const courses = this.courseService.bulkAddStudents(req.file.path); // req.file.filename
            res.status(StatusCodes.CREATED).json(courses);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public bulkAddAssistants = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
            }
            const courses = this.courseService.bulkAddAssistants(req.file.path); // req.file.filename
            res.status(StatusCodes.CREATED).json(courses);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public bulkAddDoctors = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
            }
            const courses = this.courseService.bulkAddDoctors(req.file.path); // req.file.filename
            res.status(StatusCodes.CREATED).json(courses);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const course = await this.courseService.updateUser(req.body);
            res.status(StatusCodes.OK).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid courseId' });
            }
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public getUser = async (req: Request, res: Response) => {
        try {
            const { courseId } = req.body;
            const course = await this.courseService.getUser(courseId);
            res.status(StatusCodes.OK).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid courseId' });
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        }
    }


    public deleteUser = async (req: Request, res: Response) => {
        try {
            const { courseId } = req.body;
            await this.courseService.deleteUser(courseId);
            res.status(StatusCodes.OK).json({ courseId });
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid courseId' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}