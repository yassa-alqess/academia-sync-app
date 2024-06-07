import { Column, Table, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Room from './room';
import User from './user';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;
}

export default UserRoom;
