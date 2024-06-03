import { LawAddPayload, LawResponse, LawUpdatePayload } from '@/shared/interfaces'
import Law from '@/shared/models/law'

export default class LawService {
    constructor() { }
    static async addLaw(payload: LawAddPayload): Promise<LawResponse> {

        const law = await Law.create({ ...payload });
        return {
            lawId: law.lawId,
            name: law.name,
            capacity: law.capacity,
            enrolledStudents: law.enrolledStudents,
            isDeleted: law.isDeleted,
        };
    }

    static async getLaw(lawId: string): Promise<LawResponse> {
        const law = await Law.findByPk(lawId)
        if (!law) throw new Error('law not found')

        return {
            lawId: law.lawId,
            name: law.name,
            capacity: law.capacity,
            enrolledStudents: law.enrolledStudents,
            isDeleted: law.isDeleted,
        };
    }

    static async updateLaw(payload: LawUpdatePayload): Promise<LawResponse> {
        const { lawId } = payload
        const law = await Law.findByPk(lawId)
        if (!law) throw new Error('law not found')
        await law.update(payload)
        return {
            lawId: law.lawId,
            name: law.name,
            capacity: law.capacity,
            enrolledStudents: law.enrolledStudents,
            isDeleted: law.isDeleted,
        };
    }

    static async removeLaw(lawId: string): Promise<string> {
        const law = await Law.findByPk(lawId)
        if (!law) throw new Error('law not found')
        await law.destroy()
        return lawId
    }
}