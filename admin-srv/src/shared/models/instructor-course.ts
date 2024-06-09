import { Column, Table, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Course from './course';
import Instructor from './instructor';

@Table({ schema: 'public' })
class InstructorCourse extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare instructorCourseId: string;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID,
    })
    declare courseId: string;

    @BelongsTo(() => Course)
    declare course: Course;

    @ForeignKey(() => Instructor)
    @Column({
        type: DataType.UUID,

    })
    declare instructorId: string;

    @BelongsTo(() => Instructor, 'instructorId')
    declare instructor: Instructor;




}

export default InstructorCourse;
