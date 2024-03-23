import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import RefreshToken from 'src/shared/models/refresh-token';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { extractTokenFromHeader } from 'src/shared/utils/token-extractor';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = extractTokenFromHeader(request);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }
    const isValid = await this.authService.isValidRefreshToken(refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return true;
  }
}
