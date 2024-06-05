import {
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  Table,
  HasOne,
} from 'sequelize-typescript';
import Participant from './participant';
import ParticipantConversation from './participantConversation';
import Message from './message';

@Table({ schema: process.env.SCHEMA })
class Conversation extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare conversationId: string;

  @BelongsToMany(() => Participant, () => ParticipantConversation)
  declare participants: Participant[];

  @HasMany(() => Message)
  declare messages: Message[];
}

export default Conversation;
