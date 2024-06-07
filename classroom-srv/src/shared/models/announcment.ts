import { Model, Column, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Room from './room';
import Instructor from './instructor';
import Material from './material';

@Table({ schema: process.env.SCHEMA })
class Announcment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare announcmentId: string;

  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  // @Column({
  //   type: DataType.BOOLEAN,
  // })
  // declare state: boolean;

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

  // @Column({
  //   type: DataType.BOOLEAN,
  // })
  // declare assigneeMode: boolean;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare roomId: string;

  @BelongsTo(() => Room, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare room: Room;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.UUID,
  })
  declare instructorId: string;

  @BelongsTo(() => Instructor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare instructor: Instructor;

  @HasMany(() => Material)
  declare materials: Material[];
}

export default Announcment;
