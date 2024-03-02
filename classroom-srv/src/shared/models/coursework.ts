import { Column, Table, Model, BelongsTo, HasOne, HasMany, ForeignKey, DataType } from 'sequelize-typescript';

//one to one
import CourseWorkSubmission from './coursework-submission';

//one to many
import Matiral from './matiral';
import Room from './room';

@Table({
  tableName: 'courseWorks',
  modelName: 'CoursWork',
})
class CourseWork extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare courseWork_id: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare title: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare description: string;

  @Column({
    type: DataType.DATE,
  })
  declare due_date: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare state: boolean;

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

  @ForeignKey(() => Room)
  @Column({
    type: DataType.STRING(50),
  })
  declare room_id: string;

  @BelongsTo(() => Room, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare room: Room;

  @HasMany(() => Matiral)
  declare material: Matiral[];

  @HasOne(() => CourseWorkSubmission)
  declare courseWorkSubmission: CourseWorkSubmission;
}
export default CourseWork;
