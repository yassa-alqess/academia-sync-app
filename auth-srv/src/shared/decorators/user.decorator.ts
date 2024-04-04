import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../types/jswtPayload.type';

export const userDec = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user;
    return data ? user?.[data] : user;
  },
);
