import { Injectable, NotFoundException } from '@nestjs/common';
import Role from 'src/shared/models/role';
import Permission from 'src/shared/models/permission';
import User from 'src/shared/models/user';
import UserRole from 'src/shared/models/user-role';
import RolePermission from 'src/shared/models/role-permission';
import { assignRoleDto } from './dto/assignRole.dto';

@Injectable()
export class RolesService {
  async create(name: string): Promise<Role> {
    const role = await Role.create({
      name,
    });
    return role;
  }

  async assignRole(assignRoleDto: assignRoleDto): Promise<Role> {
    const user = await User.findByPk(assignRoleDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const role = await this.findOne(assignRoleDto.roleId);
    await UserRole.create({ roleId: role.roleId, userId: user.userId });
    return role;
  }

  async grantRole(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.findOne(roleId);

    for (const permissionId of permissionIds) {
      const permission = await Permission.findByPk(permissionId);

      if (!permission) {
        throw new NotFoundException('one of the permissionIds is not found');
      }

      await RolePermission.create({
        roleId: role.roleId,
        permissionId: permissionId,
      });
    }

    return role;
  }

  async getAll(): Promise<Role[]> {
    return await Role.findAll({
      include: [Permission],
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await Role.findByPk(id, { include: [Permission] });
    if (role) {
      return role;
    }
    throw new NotFoundException('Role not found');
  }

  async findByName(name: string): Promise<Role> {
    const role = await Role.findOne({ where: { name }, include: [Permission] });
    if (role) {
      return role;
    }
    throw new NotFoundException('Role not found');
  }

  async update(
    id: string,
    name: string,
    permissionIds: string[],
  ): Promise<Role> {
    const role = await this.findOne(id);

    await role.update({ name });

    const existingPermissionIds = role.permissions.map(
      (permission) => permission.permissionId,
    );

    const permissionsToAdd = permissionIds.filter(
      (permissionId) => !existingPermissionIds.includes(permissionId),
    );
    const permissionsToRemove = existingPermissionIds.filter(
      (permissionId) => !permissionIds.includes(permissionId),
    );

    if (permissionsToRemove.length > 0) {
      await RolePermission.destroy({
        where: { roleId: id, permissionId: permissionsToRemove },
      });
    }

    if (permissionsToAdd.length > 0) {
      const newRolePermissions = permissionsToAdd.map((permissionId) => ({
        roleId: id,
        permissionId,
      }));
      await RolePermission.bulkCreate(newRolePermissions);
    }

    return role;
  }

  async DeletePermissionFromRole(roleId: string, permissionId: string) {
    const role = await this.findOne(roleId);

    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await RolePermission.destroy({
      where: {
        permissionId: permissionId,
        roleId: roleId,
      },
    });

    return role;
  }

  async DeleteRole(id: string) {
    const role = await this.findOne(id);
    if (role) {
      return await Role.destroy({
        where: {
          roleId: id,
        },
      });
    }
  }
}
