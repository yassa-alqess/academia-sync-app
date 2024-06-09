import { Column, Table, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Course from './course';
import Student from './student';

@Table({ schema: 'public' })
class StudentCourse extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare studentCourseId: string;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID,
    })
    declare courseId: string;

    @BelongsTo(() => Course)
    declare course: Course;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.UUID,

    })
    declare studentId: string;

    @BelongsTo(() => Student, 'studentId')
    declare student: Student;




}

export default StudentCourse;
