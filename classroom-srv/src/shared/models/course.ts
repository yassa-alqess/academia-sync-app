import { Column, Table, Model, HasOne, DataType, BelongsToMany } from 'sequelize-typescript';
import Room from './room';
import LawCourse from './law-course';
import UserCourse from './user-course';
import User from './user';
import Law from './law';

@Table({ schema: 'public' })
class Course extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare courseId: string;

  @Column({
    type: DataType.STRING(75),
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare grades: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare creditHours: number;

  @HasOne(() => Room)
  declare room: Room;

  @BelongsToMany(() => User, () => UserCourse)
  declare users: User[];

  @BelongsToMany(() => Law, () => LawCourse)
  declare laws: User[];

}

export default Course;