import { Column, Table, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Room from './room';
import Student from './student';


@Table({ schema: process.env.SCHEMA })
class StudentRoom extends Model {
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
    
  })
  declare studentId: string;

  @BelongsTo(() => Student, 'studentId')
  declare student: Student;

}

export default StudentRoom;
