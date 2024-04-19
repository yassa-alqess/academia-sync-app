import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class RefreshToken extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare tokenId: string;

  @Column({
    type: DataType.STRING(250),
  })
  declare token: string;
  
  @Column({
    type: DataType.DATE,
  })
  declare expiredAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default RefreshToken;
