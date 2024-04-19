import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'src/shared/types/jswtPayload.type';
import { UsersService } from 'src/users/users.service';
import { RolesService } from './../../roles/roles.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const userRole = await this.usersService.findUserById(user.sub);
    const role = await this.rolesService.findByName(userRole.role);
    const rolePermissions = role.permissions.map(
      (permission) => permission.name,
    );

    const hasRequiredPermission = requiredPermissions.some(
      (requiredPermission) => rolePermissions.includes(requiredPermission),
    );

    return hasRequiredPermission;
  }
}
