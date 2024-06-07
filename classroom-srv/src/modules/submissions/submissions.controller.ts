

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import SubmissionService from './submissions.service';
import { SubmissionAddPayload, SubmissionUpdatePayload } from '../../shared/interfaces';

export default class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) { }

    public addSubmission = async (req: Request, res: Response) => {
        try {
            const submissionPayload: SubmissionAddPayload = req.body;
            const path = req.file ? req.file.path : '';
            if (!submissionPayload.late || !submissionPayload.studentId || !submissionPayload.assignmentId) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'data are missing' });
                return;
            }
            const submission = await this.submissionService.addSubmission(submissionPayload, path); // path may be empty string
            res.status(StatusCodes.CREATED).json(submission);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    };

    public getSubmission = async (req: Request, res: Response) => {
        try {
            const { submissionId } = req.body;
            const submission = await this.submissionService.getSubmission(submissionId);
            res.status(StatusCodes.OK).json(submission);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    };

    public updateSubmission = async (req: Request, res: Response) => {
        try {
            const submissionPayload: SubmissionUpdatePayload = req.body;
            const path = req.file ? req.file.filename : '';
            const submission = await this.submissionService.updateSubmission(submissionPayload, path);
            res.status(StatusCodes.OK).json(submission);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }

    public getOnTimeSubmissions = async (req: Request, res: Response) => {
        try {
            const { assignmentId } = req.body;
            const submissions = await this.submissionService.getOnTimeSubmissions(assignmentId);
            res.status(StatusCodes.OK).json(submissions);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }

    public getLateSubmissions = async (req: Request, res: Response) => {
        try {
            const { assignmentId } = req.body;
            const submissions = await this.submissionService.getLateSubmissions(assignmentId);
            res.status(StatusCodes.OK).json(submissions);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }

    public deleteSubmission = async (req: Request, res: Response) => {
        try {
            const { submissionId } = req.body;
            await this.submissionService.deleteSubmission(submissionId);
            res.status(StatusCodes.NO_CONTENT).end();
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }

    public addGradeToSubmission = async (req: Request, res: Response) => {
        try {
            const { submissionId, grade } = req.body;
            const submission = await this.submissionService.addGradeToSubmission(submissionId, grade);
            res.status(StatusCodes.OK).json(submission);
            //eslint-disable-next-line
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }



}