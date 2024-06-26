import { Column, Table, Model, HasMany, DataType, BelongsToMany } from 'sequelize-typescript';
import LawCourse from './law-course';
import Course from './course';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class Law extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare lawId: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare capacity: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare enrolledStudents: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare isDeleted: boolean;

  @BelongsToMany(() => Course, () => LawCourse)
  declare courses: Course[];

  @HasMany(() => User)
  declare users: User[];
}

export default Law;
