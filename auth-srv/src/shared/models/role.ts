import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';

//many to many
import UserRole from './user-role';
import RolePermission from './role-permission';

@Table({
  tableName: 'roles',
  modelName: 'Role',
})
class Role extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare role_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare role_name: string;

  @HasMany(() => UserRole)
  declare userRole: UserRole[];

  @HasMany(() => RolePermission)
  declare rolePermission: RolePermission[];
}

export default Role;
