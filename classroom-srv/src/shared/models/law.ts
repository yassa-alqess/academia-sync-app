import { Column, Table, Model, HasMany, DataType } from 'sequelize-typescript';

//one to many
import LawCourse from './law-course';
import Student from './student';

@Table({
  tableName: 'law',
  modelName: 'Law',
})
class Law extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare law_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare capacity: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare enrolled_students: number;

  @HasMany(() => LawCourse)
  declare Lawcourse: LawCourse[];

  @HasMany(() => Student)
  declare student: Student[];
}
export default Law;
