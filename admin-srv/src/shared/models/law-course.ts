import { Column, Table, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Law from './law';
import Course from './course';

@Table({ schema: process.env.SCHEMA })
class LawCourse extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare lawCourseId: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
  })
  declare courseId: string;

  @ForeignKey(() => Law)
  @Column({
    type: DataType.UUID,
  })
  declare lawId: string;
}

export default LawCourse;
