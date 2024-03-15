import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import CourseWorkSubmission from './coursework-submission';
import Announcment from './announcment';
import CourseWork from './coursework';

@Table({ schema: process.env.SCHEMA })
class Material extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare materialId: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare type: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare value: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare category: boolean;

  @ForeignKey(() => Announcment)
  @Column({
    type: DataType.UUID,
  })
  declare announcmentId: string;

  @BelongsTo(() => Announcment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare announcment: Announcment;

  @ForeignKey(() => CourseWork)
  @Column({
    type: DataType.UUID,
  })
  declare courseworkId: string;

  @BelongsTo(() => CourseWork, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare courseWork: CourseWork;

  @ForeignKey(() => CourseWorkSubmission)
  @Column({
    type: DataType.UUID,
  })
  declare courseworksubmissionId: string;

  @BelongsTo(() => CourseWorkSubmission, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare courseWorkSubmission: CourseWorkSubmission;
}

export default Material;