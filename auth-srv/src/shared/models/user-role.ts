import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//many to many
import Role from './role';
import User from './user';

@Table({
  tableName: 'userRoles',
  modelName: 'UserRole',
})
class UserRole extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare userRole_id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING(50),
  })
  declare role_id: string;

  @BelongsTo(() => Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare role: Role;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default UserRole;
