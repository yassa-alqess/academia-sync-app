import { Model, Column, Table, ForeignKey, DataType, HasOne, HasMany, BelongsTo } from 'sequelize-typescript';

// one to one
import ModuleSubmission from './module-submission';
import AttendanceRecord from './attendance-record';
import CourseWorkSubmission from './coursework-submission';

//one to many
import UserRoom from './user-room';
import Module from './module';
import Feedback from './feedback';
import Law from './law';
import UserCourse from './user-course';

@Table({
  tableName: 'students',
  modelName: 'Student',
})
class Student extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare acadimic_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare display_name: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare arabic_name: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare gender: boolean;

  @Column({
    type: DataType.STRING(200),
  })
  declare hashed_passowrd: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_locked: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_deleted: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_verified: boolean; 

  @Column({
    type: DataType.STRING(50),
  })
  declare department_name: string;

  @ForeignKey(() => Law)
  @Column({
    type: DataType.STRING(50),
  })
  declare law_id: string;

  @BelongsTo(() => Law, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare law: Law;

  @Column({
    type: DataType.STRING(20),
  })
  declare group: string;


  
  @HasOne(() => AttendanceRecord)
  declare attendanceRecord: AttendanceRecord;

  @HasOne(() => CourseWorkSubmission)
  declare courseWorkSubmission: CourseWorkSubmission;

  @HasOne(() => ModuleSubmission)
  declare moduleSubmission: ModuleSubmission;

  @HasMany(() => UserRoom)
  declare userRoom: UserRoom[];

  @HasMany(() => Module)
  declare module: Module[];

  @HasMany(() => Feedback)
  declare feedback: Feedback[];

  @HasMany(() => UserCourse)
  declare userCourse: UserCourse[];
}

export default Student;
