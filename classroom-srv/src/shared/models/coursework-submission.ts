import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';

// one to one
import CourseWork from './coursework';
import Student from './student';

//one to many
import Matiral from './matiral';

@Table({
  tableName: 'courseworksubmissions',
  modelName: 'CourseWorkSubmission',
})
class CourseWorkSubmission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare submission_id: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare draft_grade: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare assigned_grade: number;

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
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updated_at: Date;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @ForeignKey(() => CourseWork)
  @Column({
    type: DataType.STRING(50),
  })
  declare coursework_id: string;

  @BelongsTo(() => Student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare student: Student;

  @BelongsTo(() => CourseWork, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare courseWork: CourseWork;

  @HasMany(() => Matiral)
  declare material: Matiral[];
}

export default CourseWorkSubmission;
