import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LawCourseService from './law-courses.service';


export default class LawCourseController {

    public static async addLawCourse(req: Request, res: Response) {
        try {
            const lawCourseId = await LawCourseService.addLawCourse(req.body);
            res.status(StatusCodes.CREATED).json({ lawCourseId });

        }
        //eslint-disable-next-line
        catch (error: any) {
            if (error?.original?.code === '23505') {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Law Course already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public static async removeLawCourse(req: Request, res: Response) {
        try {
            const lawCourseId = await LawCourseService.removeLawCourse(req.body);
            res.status(StatusCodes.OK).json({ lawCourseId });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public static async bulkRemoveLawCourses(req: Request, res: Response) {
        try {
            const lawCourseIds = await LawCourseService.bulkRemoveLawCourses(req.body);
            res.status(StatusCodes.OK).json({ lawCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public static async bulkAddLawCourses(req: Request, res: Response) {
        try {
            const lawCourseIds = await LawCourseService.bulkAddLawCourses(req.body);
            res.status(StatusCodes.OK).json({ lawCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public static async getLawCourses(req: Request, res: Response) {
        try {
            const lawCourses = await LawCourseService.getLawCourses(req.body);
            res.status(StatusCodes.OK).json(lawCourses);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}