import { Column, Table, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

// one to one
import Module from './module';
import Student from './student';

@Table({
  tableName: 'moduleSubmissions',
  modelName: 'ModuleSubmission',
})
class ModuleSubmission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare submission_id: string;

  @Column({
    type: DataType.STRING,
  })
  declare model_answer_link: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare assigned_date: Date;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING(50),
  })
  declare student_id: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.STRING(50),
  })
  declare module_id: string;

  @BelongsTo(() => Student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare student: Student;

  @BelongsTo(() => Module, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare module: Module;
}

export default ModuleSubmission;
