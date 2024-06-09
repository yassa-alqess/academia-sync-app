import { Column, Table, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Room from './room';
// import User from './user';
import Student from './student';
import Instructor from './instructor';

@Table({ schema: process.env.SCHEMA })
class UserRoom extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userRoomId: string;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare roomId: string;

  @BelongsTo(() => Room, 'roomId')
  declare room: Room;

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

export default UserRoom;
