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
    defaultValue: DataType.UUIDV4,
  })
  declare feedbackId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare comment: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare rate: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare submitted_at: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare professor_id: string;

  @BelongsTo(() => User, {
    foreignKey: 'professor_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare professor: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare student_id: string;

  @BelongsTo(() => User, {
    foreignKey: 'student_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare student: User;
}

export default Feedback;
