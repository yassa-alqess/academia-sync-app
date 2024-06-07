import logger from '../../config/logger';
import { UserAddPayload, UserResponse, UserUpdatePayload } from '../../shared/interfaces/user'
import User from '../../shared/models/user'
import { readXlsx } from '../../shared/utils/serializer'

export default class UserService {
    constructor() { }

    public async addUser(payload: UserAddPayload): Promise<UserResponse> {

        const user = await User.create({ ...payload });
        return {
            userId : user.userId,
            email: user.email,
            academicId: user.academicId,
        }

        
    }

    public async bulkAddStudents(filePath: string): Promise<UserResponse[]> {

        const data = readXlsx(filePath);
        //eslint-disable-next-line
        const courses = data.map((course: any) => {
            return {
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });

        const coursesResponse = await User.bulkCreate(courses);
        return coursesResponse.map(course => {
            return {
                courseId: course.courseId,
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });
    }

    public async bulkAddAssistants(filePath: string): Promise<UserResponse[]> {

        const data = readXlsx(filePath);
        //eslint-disable-next-line
        const courses = data.map((course: any) => {
            return {
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });

        const coursesResponse = await User.bulkCreate(courses);
        return coursesResponse.map(course => {
            return {
                courseId: course.courseId,
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });
    }

    public async bulkAddDoctors(filePath: string): Promise<UserResponse[]> {

        const data = readXlsx(filePath);
        //eslint-disable-next-line
        const courses = data.map((course: any) => {
            return {
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });

        const coursesResponse = await User.bulkCreate(courses);
        return coursesResponse.map(course => {
            return {
                courseId: course.courseId,
                name: course.name,
                grades: course.grades,
                creditHours: course.creditHours
            }
        });
    }

    public async getUser(courseId: string): Promise<UserResponse> {
        const course = await User.findByPk(courseId)
        if (!course) throw new Error('User not found')

        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    public async updateUser(payload: UserUpdatePayload): Promise<UserResponse> {
        const { courseId } = payload
        const course = await User.findByPk(courseId)
        if (!course) throw new Error('User not found')
        await course.update(payload)
        return {
            courseId: course.courseId,
            name: course.name,
            grades: course.grades,
            creditHours: course.creditHours
        };
    }

    public async deleteUser(courseId: string): Promise<string> {
        const course = await User.findByPk(courseId)
        if (!course) throw new Error('User not found')
        await course.destroy()
        return courseId

    }
}