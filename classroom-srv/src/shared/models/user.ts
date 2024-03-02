import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';

//many to many
import UserRole from './user-role';
import Preference from './preferences';
import RefreshToken from './refresh-token';
import ResetToken from './reset-token';

@Table({
  tableName: 'users',
  modelName: 'User',
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @HasMany(() => UserRole)
  declare userRole: UserRole[];

  @HasMany(() => Preference)
  declare preference: Preference[];

  @HasMany(() => RefreshToken)
  declare refreshToken: RefreshToken[];

  @HasMany(() => ResetToken) // I think we should cache those tokens not to store them
  declare resetToken: ResetToken[];
}

export default User;
