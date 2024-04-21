import { grantRoleDto } from './dto/grantRole.dto';
import { CommonResponse } from 'src/shared/commonResponse';
import { RolesService } from './roles.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import Role from 'src/shared/models/role';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createRoleDto } from './dto/createRole.dto';
import { updateRoleDto } from './dto/updateRole.dto';
import { UseGuards } from '@nestjs/common';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { Roles } from 'src/shared/decorators/role.decorator';
import { deletePermissionRoleDto } from './dto/deletePermissionRoleDto ';
import { assignRoleDto } from './dto/assignRole.dto';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly RolesService: RolesService) {}

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role created successfully',
  })
  @ApiBody({
    description: 'Role data',
    type: createRoleDto,
  })
  @Post('addRole')
  async create(
    @Body() createRoleDto: createRoleDto,
  ): Promise<CommonResponse<Role>> {
    const data = await this.RolesService.create(createRoleDto.name);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Role created successfully',
      data,
    };
  }

  @ApiBody({
    schema: {
      properties: {
        userId: { type: 'string' },
        roleId: { type: 'string' },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Post('AssignRole')
  async assignRole(
    @Body() assignRoleDto: assignRoleDto,
  ): Promise<CommonResponse<Role>> {
    const data = await this.RolesService.assignRole(assignRoleDto);
    return {
      message: 'Role assigned succssefully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiBody({
    schema: {
      properties: {
        roleId: { type: 'string' },
        permissionsIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Post('GrantRole')
  async GrantRole(grantRoleDto: grantRoleDto): Promise<CommonResponse<Role>> {
    const data = await this.RolesService.grantRole(
      grantRoleDto.name,
      grantRoleDto.permissionIds,
    );
    return {
      message: 'Role grnated sucssefully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('update')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role updated successfully',
  })
  @ApiBody({ type: updateRoleDto })
  @Post('UpdateRole')
  async update(@Body() RoleData: updateRoleDto): Promise<CommonResponse<Role>> {
    const data = await this.RolesService.update(
      RoleData.roleId,
      RoleData.name,
      RoleData.permissionsIds,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Role updated successfully',
      data,
    };
  }

  @ApiBody({
    schema: {
      properties: {
        roleId: { type: 'string' },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('read')
  @Post('OneRole')
  async getOne(@Body('roleId') roleId: string): Promise<CommonResponse<Role>> {
    const data = await this.RolesService.findOne(roleId);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'role fetched',
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('read')
  @Get('AllRoles')
  async getAll(): Promise<CommonResponse<Role[]>> {
    const data = await this.RolesService.getAll();
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'All roles',
    };
  }

  @ApiBody({
    schema: {
      properties: {
        roleId: { type: 'string' },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('delete')
  @Delete('DeleteRole')
  async Delete(@Body('roleId') roleId: string): Promise<CommonResponse<Role>> {
    await this.RolesService.DeleteRole(roleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Role deleted succesfully',
    };
  }

  @ApiBody({
    type: deletePermissionRoleDto
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('delete')
  @Post('DeletePermissionRole')
  async DeletePermissionFromRole(
    @Body() deletePermissionRoleDto: deletePermissionRoleDto,
  ): Promise<CommonResponse<Role>> {
    await this.DeletePermissionFromRole(deletePermissionRoleDto)
    return {
      statusCode: HttpStatus.OK,
      message: 'Permisson from Role deleted succesfully',
    };
  }
}
