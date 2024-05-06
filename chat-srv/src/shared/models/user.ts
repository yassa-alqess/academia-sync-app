import {
  Model,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
  Table
} from 'sequelize-typescript';
import ChatRoomUser from './chatRoom-user';
import ChatRoom from './chatRoom';
import Message from './message';

@Table({ schema: process.env.SCHEMA })
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userId: string;

  @BelongsToMany(() => ChatRoom, () => ChatRoomUser)
  declare chatRooms: ChatRoom[];

  @HasMany(()=> Message)
  declare messages: Message[]
}

export default User;
