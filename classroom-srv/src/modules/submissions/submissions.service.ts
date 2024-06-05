import { materialCategory } from "@/shared/enums";
import { SubmissionAddPayload, SubmissionResponse, SubmissionUpdatePayload } from "@/shared/interfaces";
import Submission from "@/shared/models/assignment-submission";
import Material from "@/shared/models/material";
import User from "@/shared/models/user";
export default class SubmissionService {
    public async addSubmission(submission: SubmissionAddPayload, path?: string): Promise<SubmissionResponse> {
        const newSubmission = await Submission.create({ ...submission });
        if (path) {
            await Material.create({
                filePath: path,
                cateogry: materialCategory.COURSEWORK_SUBMISSION,
                assignmentsubmissionId: newSubmission.submissionId
            });
        }
        const user = await User.findByPk(newSubmission.userId);
        const displayName = user ? user.displayName : '';
        return {
            submissionId: newSubmission.submissionId,
            draftGrade: newSubmission.draftGrade,
            late: newSubmission.late,
            text: newSubmission.text,
            updatedAt: newSubmission.updatedAt,
            createdAt: newSubmission.createdAt,
            userId: newSubmission.userId,
            displayName,
            assignmentId: newSubmission.assignmentId,
            materials: newSubmission.materials
        };
    }

    public async updateSubmission(submission: SubmissionUpdatePayload, path?: string): Promise<SubmissionResponse> {
        const { submissionId } = submission;
        const submissionInstance = await Submission.findByPk(submissionId);
        if (!submissionInstance) {
            throw new Error('Submission not found');
        }
        await submissionInstance.update({ ...submission });
        if (path) {
            const material = await Material.findOne({ where: { assignmentsubmissionId: submissionInstance.submissionId } });
            if (material) {
                await material.update({ filePath: path });
            } else {
                await Material.create({
                    filePath: path,
                    category: materialCategory.COURSEWORK_SUBMISSION,
                    assignmentsubmissionId: submissionInstance.submissionId
                });
            }
        }
        const user = await User.findByPk(submissionInstance.userId);
        const displayName = user ? user.displayName : '';
        return {
            submissionId: submissionInstance.submissionId,
            draftGrade: submissionInstance.draftGrade,
            late: submissionInstance.late,
            text: submissionInstance.text,
            updatedAt: submissionInstance.updatedAt,
            createdAt: submissionInstance.createdAt,
            userId: submissionInstance.userId,
            displayName,
            assignmentId: submissionInstance.assignmentId,
            materials: submissionInstance.materials
        };
    }

    public async getSubmission(submissionId: string): Promise<SubmissionResponse> {
        const submissionInstance = await Submission.findByPk(submissionId);
        if (!submissionInstance) {
            throw new Error('Submission not found');
        }
        const user = await User.findByPk(submissionInstance.userId);
        const displayName = user ? user.displayName : '';
        return {
            submissionId: submissionInstance.submissionId,
            draftGrade: submissionInstance.draftGrade,
            late: submissionInstance.late,
            text: submissionInstance.text,
            updatedAt: submissionInstance.updatedAt,
            createdAt: submissionInstance.createdAt,
            userId: submissionInstance.userId,
            displayName,
            assignmentId: submissionInstance.assignmentId,
            materials: submissionInstance.materials
        };
    }

    public async getOnTimeSubmissions(assignmentId: string): Promise<SubmissionResponse[]> {
        const submissions = await Submission.findAll({
            where: { assignmentId, late: false },
            include: [{
                model: User,
                attributes: ['displayName'],
                as: 'user' // alias for the User model
            }]
        });

        return submissions.map(submission => ({
            submissionId: submission.submissionId,
            draftGrade: submission.draftGrade,
            late: submission.late,
            text: submission.text,
            updatedAt: submission.updatedAt,
            createdAt: submission.createdAt,
            userId: submission.userId,
            assignmentId: submission.assignmentId,
            materials: submission.materials,
            displayName: submission.user.displayName || ''
        }));
    }

    public async getLateSubmissions(assignmentId: string): Promise<SubmissionResponse[]> {
        const submissions = await Submission.findAll({
            where: { assignmentId, late: true },
            include: [{
                model: User,
                attributes: ['displayName'],
                as: 'user' // Make sure this matches the alias in your model associations
            }]
        });

        return submissions.map(submission => ({
            submissionId: submission.submissionId,
            draftGrade: submission.draftGrade,
            late: submission.late,
            text: submission.text,
            updatedAt: submission.updatedAt,
            createdAt: submission.createdAt,
            userId: submission.userId,
            assignmentId: submission.assignmentId,
            materials: submission.materials,
            displayName: submission.user.displayName // Include the displayName from the joined user
        }));
    }

    public async deleteSubmission(submissionId: string): Promise<void> {
        const submissionInstance = await Submission.findByPk(submissionId);
        if (!submissionInstance) {
            throw new Error('Submission not found');
        }
        await submissionInstance.destroy();
    }

    public async addGradeToSubmission(submissionId: string, grade: number): Promise<SubmissionResponse> {
        const submissionInstance = await Submission.findByPk(submissionId);
        if (!submissionInstance) {
            throw new Error('Submission not found');
        }
        await submissionInstance.update({ draftGrade: grade });
        const user = await User.findByPk(submissionInstance.userId);
        const displayName = user ? user.displayName : '';
        return {
            submissionId: submissionInstance.submissionId,
            draftGrade: submissionInstance.draftGrade,
            late: submissionInstance.late,
            text: submissionInstance.text,
            updatedAt: submissionInstance.updatedAt,
            createdAt: submissionInstance.createdAt,
            userId: submissionInstance.userId,
            displayName,
            assignmentId: submissionInstance.assignmentId,
            materials: submissionInstance.materials
        };
    }

}