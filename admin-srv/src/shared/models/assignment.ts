import { Column, Table, Model, BelongsTo, HasMany, ForeignKey, DataType } from 'sequelize-typescript';
import AssignmentSubmission from './assignment-submission';
import Material from './material';
import Room from './room';
import Instructor from './instructor';

@Table({ schema: process.env.SCHEMA })
class Assignment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare assignmentId: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare title: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare assignedGrade: number;

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

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.UUID,
  })
  declare instructorId: string;

  @BelongsTo(() => Instructor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare instructor: Instructor;

  @HasMany(() => Material)
  declare materials: Material[];

  @HasMany(() => AssignmentSubmission)
  declare assignmentSubmissions: AssignmentSubmission;
}

export default Assignment;
