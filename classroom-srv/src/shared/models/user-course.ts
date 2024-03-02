import { Column, Table, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//one to many
import Course from './course';
import Instructor from './instructor';
import Student from './student';

@Table({
  tableName: 'usercourses',
  modelName: 'UserCourse',
})
class UserCourse extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare enrolled_id: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
  })
  declare course_id: string;

  @BelongsTo(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare course: Course;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.STRING(50),
  })
  declare instructor_id: string;

  @BelongsTo(() => Instructor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare instructor: Instructor;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING(50),
  })
  declare student_id: string;

  @BelongsTo(() => Student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare student: Student;
}

export default UserCourse;
