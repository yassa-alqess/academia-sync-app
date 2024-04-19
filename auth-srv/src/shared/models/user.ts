import {
  Table,
  Model,
  Column,
  HasMany,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

//many to many
import UserRole from './user-role';
import Preference from './preferences';
import RefreshToken from './refresh-token';
import ResetToken from './reset-token';
import Role from './role';

@Table({ schema: process.env.SCHEMA })
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING(200),
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(20),
    unique: true,
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
    defaultValue: false
  })
  declare isLocked: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  declare isDeleted: boolean;

  @Column({
    type: DataType.STRING(50),
  })
  declare departmentName: string;

  @Column({
    type: DataType.STRING(2),
  })
  declare group: string;

  @Column({
    type: DataType.STRING,
  })
  declare role: string;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];

  @HasMany(() => Preference)
  declare preference: Preference[];

  @HasMany(() => RefreshToken)
  declare refreshToken: RefreshToken[];

  @HasMany(() => ResetToken)
  declare resetToken: ResetToken[];
}

export default User;
