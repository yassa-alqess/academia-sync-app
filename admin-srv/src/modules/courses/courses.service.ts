import logger from '../../config/logger';
import { CourseAddPayload, CourseResponse, CourseUpdatePayload } from '../../shared/interfaces/course'
import Course from '../../shared/models/course'
import { readXlsx } from '../../shared/utils/serializer'

export default class CourseService {
    constructor() { }

    public async addCourse(payload: CourseAddPayload): Promise<CourseResponse> {

        const course = await Course.create({ ...payload });
        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    public async bulkAddCourses(filePath: string): Promise<CourseResponse[]> {

        const data = readXlsx(filePath);
        //eslint-disable-next-line
        const courses = data.map((course: any) => {
            return {
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });

        const coursesResponse = await Course.bulkCreate(courses);
        return coursesResponse.map(course => {
            return {
                courseId: course.courseId,
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });
    }

    public async getCourse(courseId: string): Promise<CourseResponse> {
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    public async updateCourse(payload: CourseUpdatePayload): Promise<CourseResponse> {
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

    public async deleteCourse(courseId: string): Promise<string> {
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')
        await course.destroy()
        return courseId

    }
}