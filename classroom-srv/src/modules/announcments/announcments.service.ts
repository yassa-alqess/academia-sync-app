import { AnnouncmentPayload, AnnouncmentResponse, AnnouncmentUpdatePayload } from "../../shared/interfaces";
import Announcment from "../../shared/models/announcment";
import Material from "../../shared/models/material";
import { materialCategory } from "../../shared/enums";
export default class AnnouncmentService {
    public async addAnnouncment(announcmentPayload: AnnouncmentPayload, path: string): Promise<AnnouncmentResponse> {
        const announcment = await Announcment.create({ ...announcmentPayload });
        if (path) {
            await Material.create({
                filePath: path,
                cateogry: materialCategory.ANNOUNCEMENT,
                announcmentId: announcment.announcmentId
            });
        }
        return {
            announcmentId: announcment.announcmentId,
            text: announcment.text,
            // state: announcment.state,
            updatedAt: announcment.updatedAt,
            createdAt: announcment.createdAt,
            // assigneeMode: announcment.assigneeMode,
            // filePath: path,
            materials: announcment.materials,
            roomId: announcment.roomId,
            userId: announcment.userId
        };
    }

    public async updateAnnouncment(announcmentPayload: AnnouncmentUpdatePayload, path: string): Promise<AnnouncmentResponse> {
        const { announcmentId } = announcmentPayload;
        const announcment = await Announcment.findByPk(announcmentId);
        if (!announcment) {
            throw new Error('Announcment not found');
        }
        await announcment.update({ ...announcmentPayload });
        if (path) {
            const material = await Material.findOne({ where: { announcmentId } });
            if (material) {
                await material.update({ filePath: path });
            } else {
                await Material.create({
                    filePath: path,
                    category: materialCategory.ANNOUNCEMENT,
                    announcmentId: announcment.announcmentId
                });
            }
        }
        return {
            announcmentId: announcment.announcmentId,
            text: announcment.text,
            updatedAt: announcment.updatedAt,
            createdAt: announcment.createdAt,
            // state: announcment.state,
            // assigneeMode: announcment.assigneeMode,
            filePath: path,
            materials: announcment.materials,
            roomId: announcment.roomId,
            userId: announcment.userId
        };
    }

    public async getAnnouncments(): Promise<AnnouncmentResponse[]> {
        //get all announcments with their materials orderd by date desc
        const announcments = await Announcment.findAll({
            include: Material,
            order: [['createdAt', 'DESC']]
        });
        // const announcments = await Announcment.findAll({ include: Material });
        return announcments.map(announcment => ({
            announcmentId: announcment.announcmentId,
            text: announcment.text,
            // state: announcment.state,
            updatedAt: announcment.updatedAt,
            createdAt: announcment.createdAt,
            // assigneeMode: announcment.assigneeMode,
            materials: announcment.materials,
            // filePath: announcment.materials[0]?.filePath, // not full path yet
            roomId: announcment.roomId,
            userId: announcment.userId
        }));
    }

    public async getAnnouncment(announcmentId: string): Promise<AnnouncmentResponse> {
        const announcment = await Announcment.findByPk(announcmentId, { include: Material });
        if (!announcment) {
            throw new Error('Announcment not found');
        }
        return {
            announcmentId: announcment.announcmentId,
            text: announcment.text,
            // state: announcment.state,
            updatedAt: announcment.updatedAt,
            createdAt: announcment.createdAt,
            // assigneeMode: announcment.assigneeMode,
            // filePath: announcment.materials[0]?.filePath, // not full path yet
            materials: announcment.materials,
            roomId: announcment.roomId,
            userId: announcment.userId
        };
    }

    public async deleteAnnouncment(announcmentId: string): Promise<void> {
        const announcment = await Announcment.findByPk(announcmentId);
        if (!announcment) {
            throw new Error('Announcment not found');
        }
        await announcment.destroy();
    }
}