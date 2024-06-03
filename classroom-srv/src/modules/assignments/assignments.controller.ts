
import { AssignmentPayload, AssignmentUpdatePayload } from '@/shared/interfaces/assignment';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AssignmentService from './assignments.service';
export default class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    public addAssignment = async (req: Request, res: Response) => {
        try {
            const assignmentPayload: AssignmentPayload = req.body;
            const path = req.file ? req.file.filename : '';
            const assignment = await this.assignmentService.addAssignment(assignmentPayload, path); // path may be empty string
            res.status(StatusCodes.CREATED).json(assignment);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    };

    public getAssignments = async (req: Request, res: Response) => {
        try {
            const assignments = await this.assignmentService.getAssignments();
            res.status(200).json(assignments);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getAssignment = async (req: Request, res: Response) => {
        try {
            const { assignmentId } = req.body;
            const assignment = await this.assignmentService.getAssignment(assignmentId);
            res.status(200).json(assignment);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public updateAssignment = async (req: Request, res: Response) => {
        try {
            const assignmentPayload: AssignmentUpdatePayload = req.body;
            const path = req.file ? req.file.filename : '';
            const assignment = await this.assignmentService.updateAssignment(assignmentPayload, path);
            res.status(200).json(assignment);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public deleteAssignment = async (req: Request, res: Response) => {
        try {
            const { assignmentId } = req.body;
            await this.assignmentService.deleteAssignment(assignmentId);
            res.status(204).end();
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

}