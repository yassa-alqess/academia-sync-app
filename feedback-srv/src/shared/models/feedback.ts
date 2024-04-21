import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class Feedback extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare feedbackId: string;

  @Column({
    type: DataType.STRING,
  })
  declare comment: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare rate: number;

  @Column({
    type: DataType.DATE,
  })
  declare submitted_at: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default Feedback;
