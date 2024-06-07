import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import Assignment from './assignment';
import Material from './material';
import Student from './student';

@Table({ schema: process.env.SCHEMA })
class AssignmentSubmission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare submissionId: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare draftGrade: number;

  // @Column({
  //   type: DataType.BOOLEAN,
  // })
  // declare state: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare late: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare text: string;

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

  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
  })
  declare studentId: string;

  @BelongsTo(() => Student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare student: Student;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
  })
  declare assignmentId: string;

  @BelongsTo(() => Assignment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare assignment: Assignment;

  @HasMany(() => Material)
  declare materials: Material[];
}

export default AssignmentSubmission;