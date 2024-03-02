import { Table, Column, Model, ForeignKey, HasOne, BelongsTo, HasMany, DataType } from 'sequelize-typescript';

// one to one
import Instructor from './instructor';
import Location from './location';

//one to many
import AttendanceRecord from './attendance-record';

@Table({
  timestamps: true,
  tableName: 'lectures',
  modelName: 'Lecture',
})
class Lecture extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare Lecture_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare name: string;

  @Column({
    type: DataType.STRING(25),
  })
  declare lecture_room: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare day: string;

  @Column({
    type: DataType.DATE,
  })
  declare start_at: Date;

  @Column({
    type: DataType.DATE,
  })
  declare end_at: Date;

  @Column({
    type: DataType.STRING(2),
  })
  declare lecture_group: string;

  @ForeignKey(() => Instructor)
  @Column({
    type: DataType.STRING(50),
  })
  declare instructor_id: string;

  @BelongsTo(() => Instructor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare instructor: Instructor;

  @HasOne(() => Location)
  declare location: Location;

  @HasMany(() => AttendanceRecord)
  declare attendanceRecord: AttendanceRecord[];
}

export default Lecture;
