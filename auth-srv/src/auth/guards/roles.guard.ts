import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'src/shared/types/jswtPayload.type';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class rulesGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user: JwtPayload = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const userRole = await this.usersService.findUserById(user.sub);

    const requiredRole = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    return requiredRole.includes(userRole.role);
  }
}
