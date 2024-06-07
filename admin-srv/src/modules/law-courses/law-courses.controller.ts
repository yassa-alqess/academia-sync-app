import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LawCourseService from './law-courses.service';


export default class LawCourseController {
    constructor(private readonly lawCourseService: LawCourseService) { }
    public addLawCourse = async (req: Request, res: Response) => {
        try {
            const lawCourseId = await this.lawCourseService.addLawCourse(req.body);
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

    public deleteLawCourse = async (req: Request, res: Response) => {
        try {
            const lawCourseId = await this.lawCourseService.deleteLawCourse(req.body);
            res.status(StatusCodes.OK).json({ lawCourseId });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public bulkDeleteLawCourses = async (req: Request, res: Response) => {
        try {
            const lawCourseIds = await this.lawCourseService.bulkDeleteLawCourses(req.body);
            res.status(StatusCodes.OK).json({ lawCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public bulkAddLawCourses = async (req: Request, res: Response) => {
        try {
            const lawCourseIds = await this.lawCourseService.bulkAddLawCourses(req.body);
            res.status(StatusCodes.OK).json({ lawCourseIds });
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public getLawCourses = async (req: Request, res: Response) => {
        try {
            const lawCourses = await this.lawCourseService.getLawCourses(req.body);
            res.status(StatusCodes.OK).json(lawCourses);
        }
        //eslint-disable-next-line
        catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}