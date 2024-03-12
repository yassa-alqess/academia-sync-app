import { Table, Model, Column, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class RefreshToken extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare tokenId: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare token: string;

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

export default RefreshToken;
