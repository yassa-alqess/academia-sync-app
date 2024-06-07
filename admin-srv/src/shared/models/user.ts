import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Law from './law';
import Announcment from './announcment';
import CourseWork from './assignment';
import CourseWorkSubmission from './assignment-submission';

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

  @HasMany(() => Announcment)
  declare announcments: Announcment[];

  @HasMany(() => CourseWork)
  declare courseWorks: CourseWork[];

  @HasMany(() => CourseWorkSubmission)
  declare courseWorkSubmissions: CourseWorkSubmission[];
}

export default User;
