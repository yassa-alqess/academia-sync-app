import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table
} from 'sequelize-typescript';
import User from './user';
import ChatRoom from './chatRoom';

@Table({ schema: process.env.SCHEMA })
class ChatRoomUser extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare ChatRoomUserId: string;

  @ForeignKey(()=> User)
  @Column({
    type: DataType.STRING,
  })
  declare userId: string;

  @ForeignKey(() => ChatRoom)
  @Column({
    type: DataType.STRING,
  })
  declare chatRoomId: string;
}

export default ChatRoomUser;
