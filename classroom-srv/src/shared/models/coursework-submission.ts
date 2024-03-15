import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import CourseWork from './coursework';
import Material from './material';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class CourseWorkSubmission extends Model {
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

  @Column({
    type: DataType.INTEGER,
  })
  declare assignedGrade: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare state: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare late: boolean;

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;

  @ForeignKey(() => CourseWork)
  @Column({
    type: DataType.UUID,
  })
  declare courseworkId: string;

  @BelongsTo(() => CourseWork, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare courseWork: CourseWork;

  @HasMany(() => Material)
  declare materials: Material[];
}

export default CourseWorkSubmission;