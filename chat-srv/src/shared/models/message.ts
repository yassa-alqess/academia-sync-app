import {
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Table,
} from 'sequelize-typescript';
import Conversation from './conversation';
import Participant from './participant';

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

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare conversationId: string;

  @BelongsTo(() => Conversation)
  declare conversation: Conversation;

  @ForeignKey(() => Participant)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare participantId: string;

  @BelongsTo(() => Participant)
  declare participant: Participant;
}

export default Message;
