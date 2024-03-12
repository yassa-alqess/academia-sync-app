import { Column, Table, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Course from './course';
import User from './user';

@Table({ schema: 'public' })
class UserCourse extends Model {

  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare userCourseId: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
  })
  declare courseId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare userId: string;
}

export default UserCourse;
