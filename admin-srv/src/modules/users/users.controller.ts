import { StatusCodes } from 'http-status-codes';
import UserService from './users.service';
import { Request, Response } from 'express';

export default class UserController {
    constructor(private readonly userService: UserService) { }


    public addUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.addUser(req.body);
            res.status(StatusCodes.CREATED).json(user);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
            // next(error);
        }
    }

    // get xlsx sheet and get all the users from it and add them to the database (all required feilds should be present in the sheet)
    public bulkAddUsers = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
            }
            const { role } = req.body;
            const users = this.userService.bulkAddUsers(req.file.path, role); // req.file.filename
            res.status(StatusCodes.CREATED).json(users);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.updateUser(req.body);
            res.status(StatusCodes.OK).json(user);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid userId' });
            }
            if (error?.original?.code === '23505') { //duplicate key value violates unique constraint
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }

    public getUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;
            const user = await this.userService.getUser(userId);
            res.status(StatusCodes.OK).json(user);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid userId' });
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        }
    }


    public deleteUser = async (req: Request, res: Response) => {
        try {
            const { userId, role } = req.body;
            await this.userService.deleteUser(userId, role);
            res.status(StatusCodes.OK).json({ userId });
            //eslint-disable-next-line
        } catch (error: any) {
            if (error?.original?.code == '22P02') { //invalid input syntax for type uuid
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid userId' });
            }
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}