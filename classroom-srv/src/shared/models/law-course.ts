import { Column, Table, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//one to many
import Law from './law';
import Course from './course';

@Table({
  tableName: 'lawCourses',
  modelName: 'LawCourse',
})
class LawCourse extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare enrolled_id: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
  })
  declare course_id: string;

  @BelongsTo(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare course: Course;

  @ForeignKey(() => Law)
  @Column({
    type: DataType.STRING(50),
  })
  declare law_id: string;

  @BelongsTo(() => Law, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare law: Law;
}

export default LawCourse;
