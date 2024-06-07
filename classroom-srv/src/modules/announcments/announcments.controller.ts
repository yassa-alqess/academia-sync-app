
import { AnnouncmentPayload, AnnouncmentUpdatePayload } from '../../shared/interfaces/announcment';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AnnouncmentService from './announcments.service';
export default class AnnouncmentController {
    constructor(private readonly announcmentService: AnnouncmentService) { }

    public addAnnouncment = async (req: Request, res: Response) => {
        try {
            const announcmentPayload: AnnouncmentPayload = req.body;
            const path = req.file ? req.file.path : '';

            if (!announcmentPayload.userId || !announcmentPayload.roomId) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'data are missing' });
                return;
            }
            const announcment = await this.announcmentService.addAnnouncment(announcmentPayload, path); // path may be empty string
            res.status(StatusCodes.CREATED).json(announcment);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    };

    public getAnnouncments = async (req: Request, res: Response) => {
        try {
            const announcments = await this.announcmentService.getAnnouncments();
            res.status(200).json(announcments);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getAnnouncment = async (req: Request, res: Response) => {
        try {
            const { announcmentId } = req.body;
            const announcment = await this.announcmentService.getAnnouncment(announcmentId);
            res.status(200).json(announcment);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public updateAnnouncment = async (req: Request, res: Response) => {
        try {
            const announcmentPayload: AnnouncmentUpdatePayload = req.body;
            const path = req.file ? req.file.filename : '';
            const announcment = await this.announcmentService.updateAnnouncment(announcmentPayload, path);
            res.status(200).json(announcment);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public deleteAnnouncment = async (req: Request, res: Response) => {
        try {
            const { announcmentId } = req.body;
            await this.announcmentService.deleteAnnouncment(announcmentId);
            res.status(204).end();
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

}