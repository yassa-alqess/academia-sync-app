import { Column, Table, Model, BelongsTo, HasMany, ForeignKey, DataType } from 'sequelize-typescript';
import CourseWorkSubmission from './coursework-submission';
import Material from './material';
import Room from './room';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class CourseWork extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare courseWorkId: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare title: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare description: string;

  @Column({
    type: DataType.DATE,
  })
  declare dueDate: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare state: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare roomId: string;

  @BelongsTo(() => Room, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare room: Room;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;

  @HasMany(() => Material)
  declare materials: Material[];

  @HasMany(() => CourseWorkSubmission)
  declare courseWorkSubmissions: CourseWorkSubmission;
}

export default CourseWork;
