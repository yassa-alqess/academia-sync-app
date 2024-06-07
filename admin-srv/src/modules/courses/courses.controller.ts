import { StatusCodes } from 'http-status-codes';
import CourseService from './courses.service';
import { Request, Response } from 'express';
// import kafkaProducer from '../../producers/room-producer';


export default class CourseController {
    constructor(private readonly courseService: CourseService) { }


    public addCourse = async (req: Request, res: Response) => {
        try {
            const course = await this.courseService.addCourse(req.body);
            // await kafkaProducer.sendMessage("notifications", req.body);
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

    // get xlsx sheet and get all the courses from it and add them to the database (all required feilds should be present in the sheet)
    public bulkAddCourses = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
            }
            const courses = this.courseService.bulkAddCourses(req.file.path); // req.file.filename
            res.status(StatusCodes.CREATED).json(courses);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public updateCourse = async (req: Request, res: Response) => {
        try {
            const course = await this.courseService.updateCourse(req.body);
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

    public getCourse = async (req: Request, res: Response) => {
        try {
            const { courseId } = req.body;
            const course = await this.courseService.getCourse(courseId);
            res.status(StatusCodes.OK).json(course);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid courseId' });
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        }
    }


    public deleteCourse = async (req: Request, res: Response) => {
        try {
            const { courseId } = req.body;
            await this.courseService.deleteCourse(courseId);
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