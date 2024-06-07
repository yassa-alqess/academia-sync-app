
import Course from '../../shared/models/course'
import UserCourse from '../../shared/models/user-course'
import { CourseUsersGetResponse, CourseUsersListPayload, CourseUsersPayload, UserCoursesGetPayload, UserCoursesGetResponse, CourseUsersGetPayload } from '../../shared/interfaces/course-users'
import User from '../../shared/models/user'
import { Role } from '../../shared/enums/role'
import { readXlsx } from '../../shared/utils'

export default class UserCourseService {
    constructor() { }

    public async addCourseUser(payload: CourseUsersPayload): Promise<string> { //add user to course
        // const course = await Course.findByPk(payload.courseId)
        // if (!course) throw new Error('Course not found')
        // const user = await User.findByPk(payload.userId)
        // if (!user) throw new Error('User not found')
        // if (await UserCourse.findOne({ where: { userId: payload.userId, courseId: payload.courseId } })) {
        //     throw new Error('User already in course')
        // }
        // const record = await UserCourse.create({ userId: payload.userId, courseId: payload.courseId })
        // return record.userCourseId
        const { userId, courseId, role } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')

        let record = null
        if (role === Role.Student) {
            if (await UserCourse.findOne({ where: { studentId: userId, courseId } })) {
                throw new Error('student already in course')
            }
            record = await UserCourse.create({ studentId: userId, courseId })
            return record.userCourseId
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            if (await UserCourse.findOne({ where: { instructorId: userId, courseId } })) {
                throw new Error('doctor already in course')
            }
            record = await UserCourse.create({ instructorId: userId, courseId })
            return record.userCourseId
        }
        throw new Error('Invalid role')
    }

    public async deleteCourseUser(payload: CourseUsersPayload): Promise<string> { //delete user from course
        const { userId, courseId, role } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')
        // const record = await UserCourse.findOne({ where: { userId: payload.userId, courseId: payload.courseId } })

        let record = null
        if (role === Role.Student) {
            record = await UserCourse.findOne({ where: { studentId: payload.userId, courseId: payload.courseId } })
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            record = await UserCourse.findOne({ where: { instructorId: payload.userId, courseId: payload.courseId } })
        }
        if (!record) throw new Error('User not in course already')
        await record.destroy()
        return record.userCourseId
    }

    public async bulkDeleteCourseStudents(payload: CourseUsersListPayload): Promise<void> { // delete users from course
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')

        const users = await User.findAll({ where: { userId: payload.userIds } }) //array of users
        if (users.length !== payload.userIds.length) throw new Error('Some users not found')

        await Promise.all(payload.userIds.map(async userId => {
            const record = await UserCourse.findOne({ where: { studentId: userId, courseId: payload.courseId } })
            if (!record) throw new Error('student not in course already')
            await record.destroy()
            return record.userCourseId
        }
        ))
    }

    public async bulkAddCourseStudents(payload: CourseUsersListPayload): Promise<void> { // add users to course
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')

        const users = await User.findAll({ where: { userId: payload.userIds } }) //array of users
        if (users.length !== payload.userIds.length) throw new Error('Some users not found')

        await Promise.all(payload.userIds.map(async userId => {
            if (await UserCourse.findOne({ where: { userId, courseId: payload.courseId } })) {
                throw new Error('student already in course')
            }
            return await UserCourse.create({ studentId: userId, courseId: payload.courseId })
        }
        ))
    }

    public async bulkAddCourseStudentsBySheet(filePath: string, courseId: string) {
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        const data = readXlsx(filePath);
        //eslint-disable-next-line
        const users = data.map((user: any) => {
            return {
                id: user.id,
                displayName: user.displayName,
            }
        });

        await Promise.all(users.map(async user => {
            if (await UserCourse.findOne({ where: { userId: user.id, courseId } })) {
                throw new Error('student already in course')
            }
            return await UserCourse.create({ studentId: user.id, courseId })
        }
        ))
    }

    public async getCourseUsers(payload: CourseUsersGetPayload): Promise<CourseUsersGetResponse> {
        const { courseId, role } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        const records = await UserCourse.findAll({ where: { courseId: courseId } })

        const users = await Promise.all(records.map(async record => {
            let result = null;
            if (role === Role.Student) {
                result = await User.findByPk(record.studentId) as User // possible null
            }
            if (role === Role.Doctor || role === Role.Assisstant) {
                result = await User.findByPk(record.instructorId) as User // possible null
            }
            if (!result) throw new Error('User not found')
            return {
                userId: result?.userId,
                email: result?.email,
                displayName: result?.displayName,
                arabicName: result?.arabicName,
                role
            }
        }));

        return { users }

    }

    public async getUserCourses(payload: UserCoursesGetPayload): Promise<UserCoursesGetResponse> {
        const { role, userId } = payload
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')

        let records = null;

        if (role === Role.Student) {
            records = await UserCourse.findAll({ where: { studentId: userId } })
        }
        else if (role === Role.Doctor || role === Role.Assisstant) {
            records = await UserCourse.findAll({ where: { instructorId: userId } })
        }
        else {
            throw new Error('Invalid role')
        }

        const courses = await Promise.all(records!.map(async record => {
            const course = await Course.findByPk(record.courseId) as Course // possible null
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