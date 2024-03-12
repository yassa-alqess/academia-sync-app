import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class ResetToken extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare tokenId: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
  })
  declare expiredAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default ResetToken;
