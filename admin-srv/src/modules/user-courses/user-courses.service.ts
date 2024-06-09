
import Course from '../../shared/models/course'
import { CourseUsersGetResponse, CourseUsersListPayload, CourseUsersPayload, UserCoursesGetPayload, UserCoursesGetResponse, CourseUsersGetPayload } from '../../shared/interfaces/course-users'
import { Role } from '../../shared/enums/role'
import { readXlsx } from '../../shared/utils'
import Student from '../../shared/models/student'
import StudentCourse from '../../shared/models/student-course'
import InstructorCourse from '../../shared/models/instructor-course'
import Instructor from '../../shared/models/instructor'

export default class UserCourseService {
    constructor() { }

    public async addCourseUser(payload: CourseUsersPayload): Promise<string> { //add user to course

        const { courseId, studentId, instructorId, role } = payload
        // if ((!studentId && !instructorId) || !courseId || !role ) throw new Error('Invalid payload')
        console.log("payload", payload)
        if (role === Role.Student) {
            if (!studentId) throw new Error('payload must have studentId')
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            if (!instructorId) throw new Error('payload must have instructorId')
        }

        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        let record = "";
        if (role === Role.Student) {
            const student = await Student.findByPk(studentId)
            if (!student) throw new Error('Student not found')

            if (await StudentCourse.findOne({ where: { studentId, courseId } })) {
                throw new Error('student already in course')
            }
            const result = await StudentCourse.create({ studentId, courseId })
            record = result.studentCourseId

        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            const instructor = await Instructor.findByPk(instructorId)
            if (!instructor) throw new Error('Instructor not found')

            if (await InstructorCourse.findOne({ where: { instructorId, courseId } })) {
                throw new Error('instructor already in course')
            }
            const result = await InstructorCourse.create({ instructorId, courseId })
            record = result.instructorCourseId
        }
        return record;


    }

    public async deleteCourseUser(payload: CourseUsersPayload): Promise<string> { //delete user from course
        const { courseId, role, studentId, instructorId } = payload
        if (role === Role.Student) {
            if (!studentId) throw new Error('payload must have studentId')
        }

        if (role === Role.Doctor || role === Role.Assisstant) {
            if (!instructorId) throw new Error('payload must have instructorId')
        }

        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        let result = "";
        if (role === Role.Student) {
            const student = await Student.findByPk(studentId)
            if (!student) throw new Error('Student not found')

            const record = await StudentCourse.findOne({ where: { studentId, courseId } })
            if (!record) throw new Error('student not in course already')
            await record.destroy()
            result = record.studentCourseId
        }

        if (role === Role.Doctor || role === Role.Assisstant) {
            const instructor = await Instructor.findByPk(instructorId)
            if (!instructor) throw new Error('Instructor not found')

            const record = await InstructorCourse.findOne({ where: { instructorId, courseId } })
            if (!record) throw new Error('instructor not in course already')
            await record.destroy()
            result = record.instructorCourseId
        }
        return result;

    }

    public async bulkDeleteCourseUsers(payload: CourseUsersListPayload): Promise<void> { // delete users from course
        const { courseId, role, studentIds, instructorIds } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        if (role === Role.Student) {
            if (!studentIds) throw new Error('payload must have studentIds')
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            if (!instructorIds) throw new Error('payload must have instructorIds')
        }

        if (role === Role.Student) {
            await Promise.all(studentIds!.map(async studentId => {
                const student = await Student.findByPk(studentId)
                if (!student) throw new Error('Student not found')
                const record = await StudentCourse.findOne({ where: { studentId, courseId } })
                if (!record) throw new Error('student not in course already')
                await record.destroy()
            }))
        }

        if (role === Role.Doctor || role === Role.Assisstant) {
            await Promise.all(instructorIds!.map(async instructorId => {
                const instructor = await Instructor.findByPk(instructorId)
                if (!instructor) throw new Error('Instructor not found')
                const record = await InstructorCourse.findOne({ where: { instructorId, courseId } })
                if (!record) throw new Error('instructor not in course already')
                await record.destroy()
            }))
        }
    }

    public async bulkAddCourseUsers(payload: CourseUsersListPayload): Promise<void> { // add users to course
        const { courseId, role, studentIds, instructorIds } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        if (role === Role.Student) {
            if (!studentIds) throw new Error('payload must have studentIds')
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            if (!instructorIds) throw new Error('payload must have instructorIds')
        }

        if (role === Role.Student) {
            await Promise.all(studentIds!.map(async studentId => {
                const student = await Student.findByPk(studentId)
                if (!student) throw new Error('Student not found')
                if (await StudentCourse.findOne({ where: { studentId, courseId } })) {
                    throw new Error('student already in course')
                }
                return await StudentCourse.create({ studentId, courseId })
            }))
        }

        if (role === Role.Doctor || role === Role.Assisstant) {
            await Promise.all(instructorIds!.map(async instructorId => {
                const instructor = await Instructor.findByPk(instructorId)
                if (!instructor) throw new Error('Instructor not found')
                if (await InstructorCourse.findOne({ where: { instructorId, courseId } })) {
                    throw new Error('instructor already in course')
                }
                return await InstructorCourse.create({ instructorId, courseId })
            }))
        }
    }

    public async bulkAddCourseUsersBySheet(filePath: string, payload: { courseId: string, role: number }): Promise<void> {
        const { courseId, role } = payload
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

        if (role === Role.Student) {
            //eslint-disable-next-line
            await Promise.all(users.map(async (user: any) => {
                const student = await Student.findOne({ where: { studentId: user.id } })
                if (!student) throw new Error('Student not found')
                if (await StudentCourse.findOne({ where: { studentId: student.id, courseId } })) {
                    throw new Error('student already in course')
                }
                return await StudentCourse.create({ studentId: student.id, courseId })
            }))
        }

        if (role === Role.Doctor || role === Role.Assisstant) {
            //eslint-disable-next-line
            await Promise.all(users.map(async (user: any) => {
                const instructor = await Instructor.findOne({ where: { instructorId: user.id } })
                if (!instructor) throw new Error('Instructor not found')
                if (await InstructorCourse.findOne({ where: { instructorId: instructor.id, courseId } })) {
                    throw new Error('instructor already in course')
                }
                return await InstructorCourse.create({ instructorId: instructor.id, courseId })
            }))
        }
    }



    public async getCourseUsers(payload: CourseUsersGetPayload): Promise<CourseUsersGetResponse> {
        const { courseId, role } = payload
        const course = await Course.findByPk(courseId)
        if (!course) throw new Error('Course not found')

        let records = null;
        if (role === Role.Student) {
            records = await StudentCourse.findAll({ where: { courseId } })
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            records = await InstructorCourse.findAll({ where: { courseId } })
        }
        if (!records) throw new Error('No records found')

        const users = await Promise.all(records!.map(async record => {
            let result = null;
            if (role === Role.Student && record instanceof StudentCourse) {
                result = await Student.findByPk(record.studentId) as Student // possible null
            }
            if ((role === Role.Doctor || role === Role.Assisstant) && record instanceof InstructorCourse) {
                result = await Instructor.findByPk(record.instructorId) as Instructor // possible null
            }
            if (!result) throw new Error('User not found')
            return (result instanceof Student) ? {
                studentId: result.studentId,
                // InstructorId: null,
                displayName: result.displayName,
                role
            } : {
                instructorId: result.instructorId,
                // studentId: null,
                displayName: result.displayName,
                role
            }
        }));
        return { users }

        // const records = await UserCourse.findAll({ where: { courseId: courseId } })

        // const users = await Promise.all(records.map(async record => {
        //     let result = null;
        //     if (role === Role.Student) {
        //         result = await User.findByPk(record.studentId) as User // possible null
        //     }
        //     if (role === Role.Doctor || role === Role.Assisstant) {
        //         result = await User.findByPk(record.instructorId) as User // possible null
        //     }
        //     if (!result) throw new Error('User not found')
        //     return {
        //         userId: result?.userId,
        //         email: result?.email,
        //         displayName: result?.displayName,
        //         arabicName: result?.arabicName,
        //         role
        //     }
        // }));

        // return { users }

    }

    public async getUserCourses(payload: UserCoursesGetPayload): Promise<UserCoursesGetResponse> {
        const { role, studentId, instructorId } = payload

        if (role === Role.Student) {
            if (!studentId) throw new Error('payload must have studentId')
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            if (!instructorId) throw new Error('payload must have instructorId')
        }

        let records = null;
        if (role === Role.Student) {
            records = await StudentCourse.findAll({ where: { studentId } })
        }
        if (role === Role.Doctor || role === Role.Assisstant) {
            records = await InstructorCourse.findAll({ where: { instructorId } })
        }
        if (!records) throw new Error('No records found')

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