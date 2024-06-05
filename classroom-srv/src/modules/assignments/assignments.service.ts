import { AssignmentPayload, AssignmentResponse, AssignmentUpdatePayload } from "@/shared/interfaces/assignment";
import Assignment from "@/shared/models/assignment";
import Material from "@/shared/models/material";
import { materialCategory } from "@/shared/enums";
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
            userId: assignment.userId
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
            // filePath: path,
            roomId: assignment.roomId,
            userId: assignment.userId
        };
    }

    public async getAssignments(): Promise<AssignmentResponse[]> {
        //get all assignments with their materials orderd by date desc
        const assignments = await Assignment.findAll({
            include: Material,
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
            userId: assignment.userId

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
            userId: assignment.userId
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