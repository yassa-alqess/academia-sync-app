import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, DataType, BelongsToMany } from 'sequelize-typescript';
import Course from './course';
import CourseWork from './assignment';
import Announcment from './announcment';
import Instructor from './instructor';
import Student from './student';
import InstructorRoom from './instructor-room';
import StudentRoom from './student-room';

@Table({ schema: process.env.SCHEMA })
class Room extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare roomId: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare name: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;

  @Column({
    type: DataType.STRING(200),
  })
  declare description: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
  })
  declare courseId: string;

  @BelongsTo(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare course: Course;

  @HasMany(() => CourseWork)
  declare courseWorks: CourseWork[];

  @HasMany(() => Announcment)
  declare announcments: Announcment[];

  @BelongsToMany(() => Instructor, () => InstructorRoom)
  declare instructors: Instructor[];

  @BelongsToMany(() => Student, () => StudentRoom)
  declare students: Student[];
}

export default Room;