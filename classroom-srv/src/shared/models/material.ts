import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import AssignmentSubmission from './assignment-submission';
import Announcment from './announcment';
import Assignment from './assignment';

@Table({ schema: process.env.SCHEMA })
class Material extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare materialId: string;

  // @Column({
  //   type: DataType.BOOLEAN,
  // })
  // declare type: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare filePath: string;

  // @Column({
  //   type: DataType.STRING(200),
  // })
  // declare title: string;

  // @Column({
  //   type: DataType.STRING,
  // })
  // declare description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare category: number;

  @ForeignKey(() => Announcment)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare announcmentId: string;

  @BelongsTo(() => Announcment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare announcment: Announcment;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare assignmentId: string;

  @BelongsTo(() => Assignment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare assignment: Assignment;

  @ForeignKey(() => AssignmentSubmission)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare assignmentsubmissionId: string;

  @BelongsTo(() => AssignmentSubmission, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare assignmentSubmission: AssignmentSubmission;
}

export default Material;