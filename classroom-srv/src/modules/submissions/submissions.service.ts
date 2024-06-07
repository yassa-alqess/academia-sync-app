import { materialCategory } from "../../shared/enums";
import { MissingSubmissionResponse, SubmissionAddPayload, SubmissionResponse, SubmissionUpdatePayload } from "../../shared/interfaces";
import Submission from "../../shared/models/assignment-submission";
import Material from "../../shared/models/material";
import Student from "../../shared/models/student";
import UserRoom from "../../shared/models/user-room";
import { Op } from "sequelize";
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
        const student = await Student.findByPk(newSubmission.studentId);
        const displayName = student ? student.displayName : '';
        return {
            submissionId: newSubmission.submissionId,
            draftGrade: newSubmission.draftGrade,
            late: newSubmission.late,
            text: newSubmission.text,
            updatedAt: newSubmission.updatedAt,
            createdAt: newSubmission.createdAt,
            studentId: newSubmission.studentId,
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
        const student = await Student.findByPk(submissionInstance.studentId);
        const displayName = student ? student.displayName : '';
        return {
            submissionId: submissionInstance.submissionId,
            draftGrade: submissionInstance.draftGrade,
            late: submissionInstance.late,
            text: submissionInstance.text,
            updatedAt: submissionInstance.updatedAt,
            createdAt: submissionInstance.createdAt,
            studentId: submissionInstance.studentId,
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
        const student = await Student.findByPk(submissionInstance.studentId);
        const displayName = student ? student.displayName : '';
        return {
            submissionId: submissionInstance.submissionId,
            draftGrade: submissionInstance.draftGrade,
            late: submissionInstance.late,
            text: submissionInstance.text,
            updatedAt: submissionInstance.updatedAt,
            createdAt: submissionInstance.createdAt,
            studentId: submissionInstance.studentId,
            displayName,
            assignmentId: submissionInstance.assignmentId,
            materials: submissionInstance.materials
        };
    }

    public async getOnTimeSubmissions(assignmentId: string): Promise<SubmissionResponse[]> {
        const submissions = await Submission.findAll({
            where: { assignmentId, late: false },
            include: [{
                model: Student,
                attributes: ['displayName'],
                as: 'student' // alias for the Student model
            }]
        });

        return submissions.map(submission => ({
            submissionId: submission.submissionId,
            draftGrade: submission.draftGrade,
            late: submission.late,
            text: submission.text,
            updatedAt: submission.updatedAt,
            createdAt: submission.createdAt,
            studentId: submission.studentId,
            assignmentId: submission.assignmentId,
            materials: submission.materials,
            displayName: submission.student.displayName || ''
        }));
    }

    public async getLateSubmissions(assignmentId: string): Promise<SubmissionResponse[]> {
        const submissions = await Submission.findAll({
            where: { assignmentId, late: true },
            include: [{
                model: Student,
                attributes: ['displayName'],
                as: 'student'
            }]
        });

        return submissions.map(submission => ({
            submissionId: submission.submissionId,
            draftGrade: submission.draftGrade,
            late: submission.late,
            text: submission.text,
            updatedAt: submission.updatedAt,
            createdAt: submission.createdAt,
            studentId: submission.studentId,
            assignmentId: submission.assignmentId,
            materials: submission.materials,
            displayName: submission.student.displayName || ''
        }));
    }

    public async getMissingSubmissions(assignmentId: string, roomId: string): Promise<MissingSubmissionResponse[]> {
        /**
         *  // Fetch all students in the room
          const allStudents = await UserRoom.findAll({
              where: { roomId },
              include: [{
                  model: Student,
                  attributes: ['studentId', 'displayName'],
                  as: 'student'
              }]
          });
  
          // Fetch all students who have submitted the assignment (either late or on time)
          const submittedStudents = await Submission.findAll({
              where: { assignmentId },
              attributes: ['studentId']
          });
  
          const submittedStudentIds = submittedStudents.map(submission => submission.studentId);
  
          // Find students who haven't submitted the assignment
          const missingStudents = allStudents
              .filter(userRoom => !submittedStudentIds.includes(userRoom.student.studentId))
              .map(userRoom => ({
                  studentId: userRoom.student.studentId,
                  displayName: userRoom.student.displayName
              }));
  
          return missingStudents;
         */


        // Fetch all students who have submitted the assignment
        const submittedStudents = await Submission.findAll({
            where: { assignmentId },
            attributes: ['studentId']
        });

        const submittedStudentIds = submittedStudents.map(submission => submission.studentId);

        // Fetch students in the room who have not submitted the assignment
        const missingStudents = await UserRoom.findAll({
            where: {
                roomId,
                studentId: {
                    [Op.notIn]: submittedStudentIds
                }
            },
            include: [{
                model: Student,
                attributes: ['studentId', 'displayName'],
                as: 'student'
            }]
        });

        // Map to the desired format
        return missingStudents.map(userRoom => ({
            studentId: userRoom.student.studentId,
            displayName: userRoom.student.displayName
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
        const student = await Student.findByPk(submissionInstance.studentId);
        const displayName = student ? student.displayName : '';
        return {
            submissionId: submissionInstance.submissionId,
            draftGrade: submissionInstance.draftGrade,
            late: submissionInstance.late,
            text: submissionInstance.text,
            updatedAt: submissionInstance.updatedAt,
            createdAt: submissionInstance.createdAt,
            studentId: submissionInstance.studentId,
            displayName,
            assignmentId: submissionInstance.assignmentId,
            materials: submissionInstance.materials
        };
    }

}