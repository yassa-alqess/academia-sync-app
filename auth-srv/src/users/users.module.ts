import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AccessTokenGuard],
  exports: [UsersService],
})
export class UsersModule {}
