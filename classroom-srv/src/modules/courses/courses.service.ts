import { CourseAddPayload, CourseResponse, CourseUpdatePayload } from '@/shared/interfaces'
import Course from '../../shared/models/course'

export default class CourseService {
    constructor() { }

    static async addCourse(payload: CourseAddPayload): Promise<CourseResponse> {

        const course = await Course.create({ ...payload });
        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    static async getCourse(courseId: string): Promise<CourseResponse> {
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    static async updateCourse(payload: CourseUpdatePayload): Promise<CourseResponse> {
        const { courseId } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')
        await course.update(payload)
        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    static async removeCourse(courseId: string): Promise<string> {
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')
        await course.destroy()
        return courseId

    }
}