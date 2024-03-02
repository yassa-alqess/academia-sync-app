import { Model, Column, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

// one to many
import Matiral from './matiral';
import Instructor from './instructor';
import Room from './room';

@Table({
  tableName: 'announcments',
  modelName: 'Announcment',
})
class Announcment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare announcment_id: string;

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
  declare updated_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare created_at: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare assigneeMode: boolean;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.STRING(50),
  })
  declare room_id: string;

  @BelongsTo(() => Room, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare room: Room;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.STRING(50),
  })
  declare instructor_id: string;

  @BelongsTo(() => Instructor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare instructor: Instructor;

  @HasMany(() => Matiral)
  declare material: Matiral[];
}

export default Announcment;
