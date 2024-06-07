import { AssignmentPayload, AssignmentResponse, AssignmentUpdatePayload } from "../../shared/interfaces/assignment";
import Assignment from "../../shared/models/assignment";
import Material from "../../shared/models/material";
import { materialCategory } from "../../shared/enums";
import User from "../../shared/models/user";
import { Op, literal } from "sequelize";
export default class AssignmentService {
    public async addAssignment(assignmentPayload: AssignmentPayload, path: string): Promise<AssignmentResponse> {
        const assignment = await Assignment.create({ ...assignmentPayload });
        if (path) {
            await Material.create({
                filePath: path,
                cateogry: materialCategory.COURSEWORK,
                assignmentId: assignment.assignmentId
            });
        }
        return {
            assignmentId: assignment.assignmentId,
            title: assignment.title,
            description: assignment.description,
            assignedGrade: assignment.assignedGrade,
            dueDate: assignment.dueDate,
            state: assignment.state,
            updatedAt: assignment.updatedAt,
            createdAt: assignment.createdAt,
            // filePath: path,
            materials: assignment.materials,
            roomId: assignment.roomId,
            instructorId: assignment.instructorId
        };
    }

    public async updateAssignment(assignmentPayload: AssignmentUpdatePayload, path: string): Promise<AssignmentResponse> {
        const { assignmentId } = assignmentPayload;
        const assignment = await Assignment.findByPk(assignmentId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        await assignment.update({ ...assignmentPayload });
        if (path) {
            const material = await Material.findOne({ where: { assignmentId } });
            if (material) {
                await material.update({ filePath: path });
            } else {
                await Material.create({
                    filePath: path,
                    category: materialCategory.ANNOUNCEMENT,
                    assignmentId: assignment.assignmentId
                });
            }
        }
        return {
            assignmentId: assignment.assignmentId,
            title: assignment.title,
            description: assignment.description,
            assignedGrade: assignment.assignedGrade,
            dueDate: assignment.dueDate,
            state: assignment.state,
            updatedAt: assignment.updatedAt,
            createdAt: assignment.createdAt,
            materials: assignment.materials,
            filePath: path,
            roomId: assignment.roomId,
            instructorId: assignment.instructorId
        };
    }

    public async getAssignments(roomId: string): Promise<AssignmentResponse[]> { //doctor endpoint
        //get all assignments with their materials orderd by date desc
        const assignments = await Assignment.findAll({
            where: { roomId },
            include: [Material, User],
            order: [['createdAt', 'DESC']]
        });

        // const assignments = await Assignment.findAll({ include: Material });
        return assignments.map(assignment => ({
            assignmentId: assignment.assignmentId,
            title: assignment.title,
            description: assignment.description,
            assignedGrade: assignment.assignedGrade,
            dueDate: assignment.dueDate,
            state: assignment.state,
            updatedAt: assignment.updatedAt,
            createdAt: assignment.createdAt,
            materials: assignment.materials,
            // filePath: assignment.materials[0]?.filePath, // not full path yet
            roomId: assignment.roomId,
            instructorId: assignment.instructorId, //doctors
            displayName: assignment.instructor.displayName

        }));
    }

    public async getFinishedAssignments(roomId: string, userId: string): Promise<AssignmentResponse[]> {
        const assignments = await Assignment.findAll({
            where: {
                roomId,
                id: {
                    [Op.in]: literal(`(
                    SELECT "assignmentId" FROM "Submissions" WHERE "userId" = '${userId}'
                )`)
                }
            },
            include: [
                { model: Material },
                { model: User }
            ],
            order: [['createdAt', 'DESC']]
        });

        return assignments.map(assignment => ({
            assignmentId: assignment.assignmentId,
            title: assignment.title,
            description: assignment.description,
            assignedGrade: assignment.assignedGrade,
            dueDate: assignment.dueDate,
            state: assignment.state,
            updatedAt: assignment.updatedAt,
            createdAt: assignment.createdAt,
            materials: assignment.materials,
            roomId: assignment.roomId,
            instructorId: assignment.instructorId,
            displayName: assignment.instructor.displayName
        }));
    }

    public async getUnfinishedAssignments(roomId: string, userId: string): Promise<AssignmentResponse[]> {
        const assignments = await Assignment.findAll({
            where: {
                roomId,
                assignmentId: {
                    [Op.notIn]: literal(`(
                    SELECT "assignmentId" FROM "Submissions" WHERE "userId" = '${userId}'
                )`)
                }
            },
            include: [
                { model: Material },
                { model: User }
            ],
            order: [['createdAt', 'DESC']]
        });

        return assignments.map(assignment => ({
            assignmentId: assignment.assignmentId,
            title: assignment.title,
            description: assignment.description,
            assignedGrade: assignment.assignedGrade,
            dueDate: assignment.dueDate,
            state: assignment.state,
            updatedAt: assignment.updatedAt,
            createdAt: assignment.createdAt,
            materials: assignment.materials,
            roomId: assignment.roomId,
            instructorId: assignment.instructorId,
            displayName: assignment.instructor.displayName
        }));
    }



    public async getAssignment(assignmentId: string): Promise<AssignmentResponse> {
        const assignment = await Assignment.findByPk(assignmentId, { include: Material });
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        return {
            assignmentId: assignment.assignmentId,
            title: assignment.title,
            description: assignment.description,
            assignedGrade: assignment.assignedGrade,
            dueDate: assignment.dueDate,
            state: assignment.state,
            updatedAt: assignment.updatedAt,
            createdAt: assignment.createdAt,
            materials: assignment.materials,
            // filePath: assignment.materials[0]?.filePath, // not full path yet
            roomId: assignment.roomId,
            instructorId: assignment.instructorId
        };
    }

    public async deleteAssignment(assignmentId: string): Promise<void> {
        const assignment = await Assignment.findByPk(assignmentId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        await assignment.destroy();
    }
}