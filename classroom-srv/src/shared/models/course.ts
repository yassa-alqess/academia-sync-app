import { Column, Table, Model, HasOne, HasMany, DataType } from 'sequelize-typescript';

//one to one
import Room from './room';

// one to many
import Exam from './exam';
import LawCourse from './law-course';
import UserCourse from './user-course';

@Table({
  tableName: 'courses',
  modelName: 'Course',
})
class Course extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare course_id: string;

  @Column({
    type: DataType.STRING(75),
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare grades: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare creditHours: number;

  // @Column({
  //   type: DataType.STRING(50),
  // })
  // declare prerequisites: string;

  @HasOne(() => Room)
  declare room: Room;

  @HasMany(() => Exam)
  declare exam: Exam[];

  @HasMany(() => LawCourse)
  declare lawCourse: LawCourse[];

  @HasMany(() => UserCourse)
  declare userCourse: UserCourse[];
}

export default Course;
