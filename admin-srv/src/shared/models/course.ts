import { Column, Table, Model, HasOne, DataType, BelongsToMany } from 'sequelize-typescript';
import Room from './room';
import LawCourse from './law-course';
import Law from './law';
import Instructor from './instructor';
import Student from './student';
import InstructorCourse from './instructor-course';
import StudentCourse from './student-course';

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

  @BelongsToMany(() => Instructor, () => InstructorCourse)
  declare instructors: Instructor[];

  @BelongsToMany(() => Student, () => StudentCourse)
  declare students: Student[];

  @BelongsToMany(() => Law, () => LawCourse)
  declare laws: Law[];

}

export default Course;