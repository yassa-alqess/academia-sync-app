import { Model, Column, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Matiral from './matiral';
import Room from './room';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class Announcment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare announcmentId: string;

  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare state: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare assigneeMode: boolean;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.STRING(50),
  })
  declare roomId: string;

  @BelongsTo(() => Room, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare room: Room;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;

  @HasMany(() => Matiral)
  declare materials: Matiral[];
}

export default Announcment;
