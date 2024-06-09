import { Column, Table, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Course from './course';
// import User from './user';
import Instructor from './instructor';
import Student from './student';

@Table({ schema: 'public' })
class UserCourse extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userCourseId: string;

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
    allowNull: true,
  })
  declare studentId: string;

  @BelongsTo(() => Student, 'studentId')
  declare student: Student;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare instructorId: string;

  @BelongsTo(() => Instructor, 'instructorId')
  declare instructor: Instructor;



}

export default UserCourse;
