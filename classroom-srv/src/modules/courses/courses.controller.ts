import { StatusCodes } from 'http-status-codes';
import CourseService from './courses.service';
import { Request, Response } from 'express';

export default class CourseController {
    constructor() { }

    static async addCourse(req: Request, res: Response) {
        try {
            const course = await CourseService.addCourse(req.body);
            res.status(StatusCodes.CREATED).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Course already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
            // next(error);
        }
    }

    static async updateCourse(req: Request, res: Response) {
        try {
            const course = await CourseService.updateCourse(req.body);
            res.status(StatusCodes.OK).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid courseId' });
            }
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Course already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async getCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.body;
            const course = await CourseService.getCourse(courseId);
            res.status(StatusCodes.OK).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid courseId' });
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        }
    }


    static async removeCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.body;
            await CourseService.removeCourse(courseId);
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