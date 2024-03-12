import { Table, Model, Column, ForeignKey, DataType } from 'sequelize-typescript';
import Role from './role';
import Permission from './permission';

@Table({ schema: process.env.SCHEMA })
class RolePermission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare rolePermissionId: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING(50),
  })
  declare roleId: string;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.STRING(50),
  })
  declare permissionId: string;
}

export default RolePermission;
