import {
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
  Table,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import Conversation from './conversation';
import ParticipantConversation from './participantConversation';
import User from './user';
import Message from './message';

@Table({ schema: process.env.SCHEMA })
class Participant extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare participantId: string;

  @BelongsToMany(() => Conversation, () => ParticipantConversation)
  declare conversations: Conversation[];

  @HasOne(() => User, { foreignKey: 'participantId' })
  declare user: User;

  @HasMany(() => Message)
  declare messages: Message[];
}
export default Participant;
