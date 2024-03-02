import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';

//one to one
import Lecture from './lecture';

//one to many
import UserRoom from './user-room';
import Announcment from './announcment';
import Location from './location';
import Feedback from './feedback';
import UserCourse from './user-course';

@Table({
  tableName: 'instructors',
  modelName: 'instructor',
})

class Instructor extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare display_name: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare arabic_name: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare gender: boolean;

  @Column({
    type: DataType.STRING(200),
  })
  declare hashed_passowrd: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_locked: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare id_deleted: boolean;

  @Column({
    type: DataType.STRING(50),
  })
  declare department_name: string;


  @HasOne(() => Lecture)
  declare lecture: Lecture;

  @HasMany(() => UserRoom)
  declare userRoom: UserRoom[];

  @HasMany(() => Announcment)
  declare announcment: Announcment[];

  @HasMany(() => Location)
  declare location: Location[];

  @HasMany(() => Feedback)
  declare feedback: Feedback[];

  @HasMany(() => UserCourse)
  declare userCourse: UserCourse[];
}

export default Instructor;
