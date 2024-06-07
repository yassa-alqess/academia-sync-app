
import Course from '../../shared/models/course'
import LawCourse from '@/shared/models/law-course'
import { LawCoursesGetPayload, LawCoursesGetResponse, LawCoursesListPayload, LawCoursesPayload } from '@/shared/interfaces/law-courses'
import Law from '@/shared/models/law'

export default class LawCourseService {
    constructor() { }

    public async addLawCourse(payload: LawCoursesPayload): Promise<string> { //add course to law
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')
        const law = await Law.findByPk(payload.lawId)
        if (!law) throw new Error(' Law not found')
        if (await LawCourse.findOne({ where: { lawId: payload.lawId, courseId: payload.courseId } })) {
            throw new Error('course already in this law')
        }
        const record = await LawCourse.create({ lawId: payload.lawId, courseId: payload.courseId })
        return record.lawCourseId;
    }

    public async deleteLawCourse(payload: LawCoursesPayload): Promise<string> { //delete course from law
        const law = await Law.findByPk(payload.lawId)
        if (!law) throw new Error(' Law not found')
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')
        if (await LawCourse.findOne({ where: { lawId: payload.lawId, courseId: payload.courseId } })) {
            throw new Error('course already in this law')
        }
        const record = await LawCourse.create({ lawId: payload.lawId, courseId: payload.courseId })
        await record.destroy()
        return record.lawCourseId;
    }

    public async bulkDeleteLawCourses(payload: LawCoursesListPayload): Promise<string> { // delete list of courses from law
        const law = await Law.findByPk(payload.lawId)
        if (!law) throw new Error('law not found')

        const courses = await Course.findAll({ where: { userId: payload.courseIds } }) //array of courses
        if (courses.length !== payload.courseIds.length) throw new Error('Some courses not found')

        const records = await Promise.all(payload.courseIds.map(async courseId => {
            const record = await LawCourse.findOne({ where: { courseId, lawId: payload.lawId } })
            if (!record) throw new Error('course is not in this law already')
            await record.destroy()
            return record.lawCourseId
        }
        ))
        return records.join(',')
    }

    public async bulkAddLawCourses(payload: LawCoursesListPayload): Promise<string> { // add list of courses to law
        const law = await Course.findByPk(payload.lawId)
        if (!law) throw new Error('law not found')

        const courses = await Course.findAll({ where: { courseId: payload.courseIds } }) //array of users
        if (courses.length !== payload.courseIds.length) throw new Error('Some courses not found')

        const records = await Promise.all(payload.courseIds.map(async courseId => {
            if (await LawCourse.findOne({ where: { courseId, lawId: payload.lawId } })) {
                throw new Error('User already in course')
            }
            return await LawCourse.create({ courseId, lawId: payload.lawId })
        }
        ))
        return records.map(record => record.lawCourseId).join(',')

    }

    public async getLawCourses(payload: LawCoursesGetPayload): Promise<LawCoursesGetResponse> {
        const law = await Course.findByPk(payload.lawId)
        if (!law) throw new Error('law not found')

        const records = await LawCourse.findAll({ where: { lawId: payload.lawId } })
        const courses = await Promise.all(records.map(async record => {
            const course = await Course.findByPk(record.courseId) as Course
            if (!course) throw new Error('course not found')
            return {
                courseId: course.courseId,
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        }))
        return { courses }
    }

}