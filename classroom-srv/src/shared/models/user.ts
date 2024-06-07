import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import Law from './law';
import Instructor from './instructor';
import Student from './student';



@Table({ schema: 'public' })
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare displayName: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare arabicName: string;

  @Column({
    type: DataType.STRING(200),
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare role: boolean;

  @ForeignKey(() => Law)
  @Column({
    type: DataType.UUID,
  })
  declare lawId: string;

  @BelongsTo(() => Law)
  declare law: Law;






  @HasOne(() => Student)
  declare student: Student;

  @HasOne(() => Instructor)
  declare instructor: Instructor;
}

export default User;
