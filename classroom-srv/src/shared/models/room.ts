import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';

//one to one
import Course from './course';

//one to many
import UserRoom from './user-room';
import CourseWork from './coursework';

@Table({
  tableName: 'rooms',
  modelName: 'Room',
})
class Room extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare room_id: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare name: string;

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

  @Column({
    type: DataType.STRING(200),
  })
  declare description: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
  })
  declare course_id: string;

  @BelongsTo(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare course: Course;

  @HasMany(() => UserRoom)
  declare userRoom: UserRoom[];

  @HasMany(() => CourseWork)
  declare courseWork: CourseWork[];
}

export default Room;
