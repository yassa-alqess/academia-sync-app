import { Column, Table, Model, HasOne, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//one to one
import ModuleSubmission from './module-submission';

//one to many
import Exam from './exam';
import Student from './student';

@Table({
  tableName: 'modules',
  modelName: 'Module',
})
class Module extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare modeule_id: string;

  @Column({
    type: DataType.STRING(2),
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare referal_link: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
  })
  declare student_id: string;

  @BelongsTo(() => Student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare student: Student;

  @ForeignKey(() => Exam)
  @Column({
    type: DataType.STRING(50),
  })
  declare exam_id: string;

  @BelongsTo(() => Exam, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare exam: Exam;

  @HasOne(() => ModuleSubmission)
  declare moduleSubmission: ModuleSubmission;
}

export default Module;
