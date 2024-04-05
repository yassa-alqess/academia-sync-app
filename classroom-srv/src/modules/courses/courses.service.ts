import { CourseAddPayload, CourseResponse, CourseUpdatePayload } from '@/shared/interfaces'
import Course from '../../shared/models/course'

export const addCourse = async (payload: CourseAddPayload): Promise<CourseResponse> => {

    const course = await Course.create({ ...payload });
    return {
        courseId: course.courseId,
        name: course.name,
        grades: course.grades,
        creditHours: course.creditHours
    };
}

export const getCourse = async (courseId: string): Promise<CourseResponse> => {
    const course = await Course.findByPk(courseId)
    if (!course) throw new Error('Course not found')

    return {
        courseId: course.courseId,
        name: course.name,
        grades: course.grades,
        creditHours: course.creditHours
    };
}

export const updateCourse = async (payload: CourseUpdatePayload): Promise<CourseResponse> => {
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

export const removeCourse = async (courseId: string): Promise<string> => {
    const course = await Course.findByPk(courseId)
    if (!course) throw new Error('Course not found')
    await course.destroy()
    return courseId
}