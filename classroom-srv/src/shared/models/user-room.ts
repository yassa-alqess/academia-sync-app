import { Column, Table, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Room from './room';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class UserRoom extends Model {
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  declare userRoomId: string;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.STRING(50),
  })
  declare roomId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare userId: string;
}
export default UserRoom;
