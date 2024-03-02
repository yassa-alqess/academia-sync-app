import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//many to many
import Role from './role';
import Permission from './permission';

@Table({
  tableName: 'rolePermissions',
  modelName: 'RolePermission',
})
class RolePermission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare rolePermission_id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING(50),
  })
  declare role_id: string;

  @BelongsTo(() => Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare role: Role;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.STRING(50),
  })
  declare permission_id: string;

  @BelongsTo(() => Permission, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare permission: Permission;
}

export default RolePermission;
