import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { UsersService } from 'src/users/users.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [JwtModule],
  controllers: [PermissionsController],
  providers: [
    RolesService,
    AccessTokenGuard,
    UsersService,
    PermissionsService,
    PreferencesService,
    rulesGuard,
    PermissionGuard,
  ],
  exports: [PermissionsService],
})
export class PermissionsModule {}
