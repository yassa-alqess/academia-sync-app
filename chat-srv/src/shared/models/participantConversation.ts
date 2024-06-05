import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import ChatParticipant from './participant';
import Conversation from './conversation';

@Table({ schema: process.env.SCHEMA })
class ParticipantConversation extends Model {
  @ForeignKey(() => ChatParticipant)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare participantId: string;

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare conversationId: string;
}

export default ParticipantConversation;
