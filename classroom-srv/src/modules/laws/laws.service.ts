import { LawAddPayload, LawResponse, LawUpdatePayload } from "@/src/shared/interfaces"
import Law from '../../shared/models/law'

export const addLaw = async (payload: LawAddPayload): Promise<LawResponse> => {

    const law = await Law.create({ ...payload });
    return {
        lawId: law.lawId,
        name: law.name,
        capacity: law.capacity,
        enrolledStudents: law.enrolledStudents,
        isDeleted: law.isDeleted,
    };
}

export const getLaw = async (lawId: string): Promise<LawResponse> => {
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

export const updateLaw = async (payload: LawUpdatePayload): Promise<LawResponse> => {
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

export const removeLaw = async (lawId: string): Promise<string> => {
    const law = await Law.findByPk(lawId)
    if (!law) throw new Error('law not found')
    await law.destroy()
    return lawId
}