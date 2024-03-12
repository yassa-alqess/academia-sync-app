import { Table, Model, Column, ForeignKey, DataType } from 'sequelize-typescript';
import Role from './role';
import User from './user';

@Table({ schema: process.env.SCHEMA })
class UserRole extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare userRoleId: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING(50),
  })
  declare roleId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare userId: string;

}

export default UserRole;
