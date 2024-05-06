import {
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
  Table
} from 'sequelize-typescript';
import Message from './message';
import ChatRoomUser from './chatRoom-user';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class ChatRoom extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare chatRoomId: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @HasMany(() => Message)
  declare messages: Message[];

  @BelongsToMany(() => User, () => ChatRoomUser)
  declare users: User[];
}

export default ChatRoom;
