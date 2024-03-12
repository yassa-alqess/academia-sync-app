import { Table, Model, Column, HasMany, DataType, BelongsToMany } from 'sequelize-typescript';

//many to many
import UserRole from './user-role';
import Preference from './preferences';
import RefreshToken from './refresh-token';
import ResetToken from './reset-token';
import Role from './role';

@Table({ schema: 'public' })
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare userId: string;

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
