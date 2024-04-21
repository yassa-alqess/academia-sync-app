import { Injectable, NotFoundException } from '@nestjs/common';
import Permission from 'src/shared/models/permission';

@Injectable()
export class PermissionsService {
  async create(name: string): Promise<Permission> {
    return await Permission.create({
      name,
    });
  }

  async getAll(): Promise<Permission[]> {
    return await Permission.findAll();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await Permission.findByPk(id);
    if (permission) {
      return permission;
    }
    throw new NotFoundException('Permission not found');
  }

  async update(name: string, permissionId: string): Promise<Permission> {
    const permission = await this.findOne(permissionId);
    return permission.update({ name: name });
  }

  async Delete(id: string) {
    const permission = await this.findOne(id);

    if (permission) {
      return await Permission.destroy({
        where: {
          permissionId: id,
        },
      });
    }
  }
}
