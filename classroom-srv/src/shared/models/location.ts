import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//one to one
import Lecture from './lecture';

//one to many
import Instructor from './instructor';

@Table({
  tableName: 'loactions',
  modelName: 'Location',
})
class Location extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare location_id: string;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.STRING(50),
  })
  declare instructor_id: string;

  @BelongsTo(() => Instructor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare instructor: Instructor;

  @ForeignKey(() => Lecture)
  @Column({
    type: DataType.STRING(2),
  })
  declare lecture_id: string;

  @BelongsTo(() => Lecture, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare lecture: Lecture;
}

export default Location;
