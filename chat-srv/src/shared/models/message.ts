import {
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Table
} from 'sequelize-typescript';
import ChatRoom from './chatRoom';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class Message extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare messageId: string;

  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  @ForeignKey(() => ChatRoom)
  declare chatRoomId: string;

  @BelongsTo(() => ChatRoom)
  declare chatRoom: ChatRoom;

  @ForeignKey(() => User)
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;
}

export default Message;
