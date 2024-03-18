import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class Preference extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare preferenceId: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare value: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare preferenceType: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default Preference;
