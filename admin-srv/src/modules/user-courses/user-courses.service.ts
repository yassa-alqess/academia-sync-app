
import Course from '../../shared/models/course'
import UserCourse from '../../shared/models/user-course'
import { CourseUsersGetResponse, CourseUsersListPayload, CourseUsersPayload, UserCoursesGetPayload, UserCoursesGetResponse, CourseUsersGetPayload, PartialUserResponse } from '../../shared/interfaces/course-users'
import User from '../../shared/models/user'

export default class UserCourseService {
    constructor() { }

    public async addCourseUser(payload: CourseUsersPayload): Promise<string> { //add user to course
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')
        const user = await User.findByPk(payload.userId)
        if (!user) throw new Error('User not found')
        if (await UserCourse.findOne({ where: { userId: payload.userId, courseId: payload.courseId } })) {
            throw new Error('User already in course')
        }
        const record = await UserCourse.create({ userId: payload.userId, courseId: payload.courseId })
        return record.userCourseId
    }

    public async deleteCourseUser(payload: CourseUsersPayload): Promise<string> { //delete user from course
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')
        const user = await User.findByPk(payload.userId)
        if (!user) throw new Error('User not found')
        const record = await UserCourse.findOne({ where: { userId: payload.userId, courseId: payload.courseId } })
        if (!record) throw new Error('User not in course already')
        await record.destroy()
        return record.userCourseId
    }

    public async bulkDeleteCourseUsers(payload: CourseUsersListPayload): Promise<string> { // delete users from course
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')

        const users = await User.findAll({ where: { userId: payload.userIds } }) //array of users
        if (users.length !== payload.userIds.length) throw new Error('Some users not found')

        const records = await Promise.all(payload.userIds.map(async userId => {
            const record = await UserCourse.findOne({ where: { userId, courseId: payload.courseId } })
            if (!record) throw new Error('User not in course already')
            await record.destroy()
            return record.userCourseId
        }
        ))
        return records.join(',')
    }

    public async bulkAddCourseUsers(payload: CourseUsersListPayload): Promise<string> { // add users to course
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')

        const users = await User.findAll({ where: { userId: payload.userIds } }) //array of users
        if (users.length !== payload.userIds.length) throw new Error('Some users not found')

        const records = await Promise.all(payload.userIds.map(async userId => {
            if (await UserCourse.findOne({ where: { userId, courseId: payload.courseId } })) {
                throw new Error('User already in course')
            }
            return await UserCourse.create({ userId, courseId: payload.courseId })
        }
        ))
        return records.map(record => record.userCourseId).join(',')

    }

    public async getCourseUsers(payload: CourseUsersGetPayload): Promise<CourseUsersGetResponse> {
        const course = await Course.findByPk(payload.courseId)
        if (!course) throw new Error('Course not found')

        const records = await UserCourse.findAll({ where: { courseId: payload.courseId } })
        const users = await Promise.all(records.map(async record => {
            const user = await User.findByPk(record.userId) as User // possible null
            return {
                userId: user.userId,
                email: user.email,
                displayName: user.displayName,
                arabicName: user.arabicName,
                role: user.role
            } as PartialUserResponse
        }))
        return { users }
    }

    public async getUserCourses(payload: UserCoursesGetPayload): Promise<UserCoursesGetResponse> {
        const user = await User.findByPk(payload.userId)
        if (!user) throw new Error('User not found')

        const records = await UserCourse.findAll({ where: { userId: payload.userId } })
        const courses = await Promise.all(records.map(async record => {
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