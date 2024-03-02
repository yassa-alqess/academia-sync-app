import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//many to many
import User from './user';

@Table({
  tableName: 'resetTokens',
  modelName: 'ResetToken',
})
class ResetToken extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare token_id: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
  })
  declare expired_at: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default ResetToken;
