import { StatusCodes } from 'http-status-codes';
import LawService from './laws.service';
import { Request, Response } from 'express';

export default class LawController {
    constructor() { }
    static async addLaw(req: Request, res: Response) {
        try {
            const law = await LawService.addLaw(req.body);
            res.status(StatusCodes.CREATED).json(law);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Law already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
            // next(error);
        }
    }

    static async updateLaw(req: Request, res: Response) {
        try {
            const law = await LawService.updateLaw(req.body);
            res.status(StatusCodes.OK).json(law);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid lawId' });
            }
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Law already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    static async getLaw(req: Request, res: Response) {
        try {
            const { lawId } = req.body;
            const law = await LawService.getLaw(lawId);
            res.status(StatusCodes.OK).json(law);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid lawId' });
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        }
    }


    static async removeLaw(req: Request, res: Response) {
        try {
            const { lawId } = req.body;
            await LawService.removeLaw(lawId);
            res.status(StatusCodes.OK).json({ lawId });
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid lawId' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}

