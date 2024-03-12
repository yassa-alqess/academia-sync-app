import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Law from './law';

@Table({ schema: 'public' })
class User extends Model {

  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare userId: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare academicId: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare displayName: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare arabicName: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare gender: boolean;

  @Column({
    type: DataType.STRING(200),
  })
  declare hashedPassowrd: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare isLocked: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare idDeleted: boolean;

  @Column({
    type: DataType.STRING(50),
  })
  declare departmentName: string;

  @Column({
    type: DataType.STRING(2),
  })
  declare group: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare role: boolean;

  @ForeignKey(() => Law)
  @Column
  declare lawId: string;

  @BelongsTo(() => Law)
  declare law: Law;
}

export default User;
