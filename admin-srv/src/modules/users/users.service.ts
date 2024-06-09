import Student from '../../shared/models/student';
import { Role } from '../../shared/enums/role';
import { UserAddPayload, UserResponse, UserUpdatePayload } from '../../shared/interfaces/user'
import User from '../../shared/models/user'
import { readXlsx } from '../../shared/utils/serializer'
import Instructor from '../../shared/models/instructor';

export default class UserService {
    constructor() { }

    public async addUser(payload: UserAddPayload): Promise<UserResponse> {

        const user = await User.create({ ...payload });
        const { role, displayName } = payload;
        let response = null;
        if (role == Role.Student) {
            response = await Student.create({ displayName, userId: user.userId })
            // return {
            //     userId: user.userId,
            //     studentId: student?.studentId,
            //     academicId: user.academicId,
            //     displayName: user.displayName,
            //     role: user.role
            // }
        }
        else if (role == Role.Doctor || role == Role.Assisstant) {
            response = await Instructor.create({ displayName, userId: user.userId })

            // return {
            //     userId: user.userId,
            //     instructorId: instructor?.instructorId,
            //     academicId: user.academicId,
            //     displayName: user.displayName,
            //     role: user.role
            // }
        }
        return (response instanceof Student) ? {
            userId: user.userId,
            studentId: response?.studentId,
            academicId: user.academicId,
            displayName: user.displayName,
            role: user.role
        } : {
            userId: user.userId,
            instructorId: response?.instructorId,
            academicId: user.academicId,
            displayName: user.displayName,
            role: user.role
        }
    }

    public async bulkAddUsers(filePath: string, role: number): Promise<UserResponse[]> {

        const data = readXlsx(filePath);
        //eslint-disable-next-line
        const users = data.map((user: any) => {
            return {
                academicId: user.academicId,
                displayName: user.displayName,
                role
            }
        });

        const usersResponse = await User.bulkCreate(users);
        await Promise.all(usersResponse.map(async user => {
            const { role, displayName } = user;
            if (role == Role.Student) {
                Student.create({ displayName, userId: user.userId })
            }
            else if (role == Role.Doctor || role == Role.Assisstant) {
                Instructor.create({ displayName, userId: user.userId })
            }
        }))

        return usersResponse.map(user => {
            return {
                userId: user.userId,
                academicId: user.academicId,
                displayName: user.displayName,
                role: user.role,
            }
        });
    }


    public async getUser(userId: string): Promise<UserResponse> {
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')

        return {
            userId: user.userId,
            academicId: user.academicId,
            displayName: user.displayName,
            role: user.role
        }
    }

    public async updateUser(payload: UserUpdatePayload): Promise<UserResponse> {
        const { userId, role } = payload
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')
        await user.update(payload)

        if (role == Role.Student) {
            const student = await Student.findOne({ where: { userId } })
            if (student) await student.update({ displayName: payload.displayName })
        }
        else if (role == Role.Doctor || role == Role.Assisstant) {
            const instructor = await Instructor.findOne({ where: { userId } })
            if (instructor) await instructor.update({ displayName: payload.displayName })
        }

        return {
            userId: user.userId,
            academicId: user.academicId,
            displayName: user.displayName,
            role: user.role
        }
    }

    public async deleteUser(userId: string, role: number): Promise<string> {
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')
        await user.destroy()
        if (role == Role.Student) {
            const student = await Student.findOne({ where: { userId } })
            if (student) await student.destroy()
        }
        else if (role == Role.Doctor || role == Role.Assisstant) {
            const instructor = await Instructor.findOne({ where: { userId } })
            if (instructor) await instructor.destroy()
        }
        return userId

    }
}