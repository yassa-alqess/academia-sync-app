import { Column, Table, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Law from './law';
import Course from './course';

@Table({ schema: process.env.SCHEMA })
class LawCourse extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare lawCourseId: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
  })
  declare courseId: string;

  @ForeignKey(() => Law)
  @Column({
    type: DataType.STRING(50),
  })
  declare lawId: string;
}

export default LawCourse;
