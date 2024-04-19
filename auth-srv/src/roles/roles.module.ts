import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { UsersService } from 'src/users/users.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';

@Module({
  imports: [JwtModule],
  controllers: [RolesController],
  providers: [
    RolesService,
    AccessTokenGuard,
    UsersService,
    PermissionsService,
    PreferencesService,
    rulesGuard,
    PermissionGuard,
  ],
  exports: [RolesService],
})
export class RolesModule {}
