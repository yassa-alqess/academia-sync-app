import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { JwtModule } from '@nestjs/jwt';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [
    RolesService,
    AccessTokenGuard,
    UsersService,
    PermissionsService,
    PreferencesService,
    rulesGuard,
    PermissionGuard,
  ],
  exports: [UsersService],
})
export class UsersModule {}
