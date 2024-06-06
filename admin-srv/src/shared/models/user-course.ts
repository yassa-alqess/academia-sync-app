import { Column, Table, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Course from './course';
import User from './user';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;
}

export default UserCourse;
