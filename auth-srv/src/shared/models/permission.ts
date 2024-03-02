import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';

//many to many
import RolePermission from './role-permission';

@Table({
  tableName: 'permissions',
  modelName: 'Permission',
})
class Permission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
  })
  declare permission_id: string;

  @Column({
    type: DataType.STRING,
  })
  declare permission_name: string;

  @HasMany(() => RolePermission)
  declare rolePermission: RolePermission[];
}

export default Permission;
