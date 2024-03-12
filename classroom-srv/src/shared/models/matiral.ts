import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import CourseWorkSubmission from './coursework-submission';
import Announcment from './announcment';
import CourseWork from './coursework';

@Table({ schema: process.env.SCHEMA })
class Matiral extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare matiralId: string;

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
    type: DataType.STRING(50),
  })
  declare announcmentId: string;

  @BelongsTo(() => Announcment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare announcment: Announcment;

  @ForeignKey(() => CourseWork)
  @Column({
    type: DataType.STRING(50),
  })
  declare courseworkId: string;

  @BelongsTo(() => CourseWork, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare courseWork: CourseWork;

  @ForeignKey(() => CourseWorkSubmission)
  @Column({
    type: DataType.STRING(50),
  })
  declare courseworksubmissionId: string;

  @BelongsTo(() => CourseWorkSubmission, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare courseWorkSubmission: CourseWorkSubmission;
}

export default Matiral;
