import Permission from 'src/shared/models/permission';
import { PermissionsService } from './permissions.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommonResponse } from 'src/shared/commonResponse';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { updatePermissionDto } from './dto/updatePermission.dto';

@ApiBearerAuth()
@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    schema: {
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  })
  @Post('AddPermission')
  async create(
    @Body('name') name: string,
  ): Promise<CommonResponse<Permission>> {
    const data = await this.permissionsService.create(name);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Permission created successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('update')
  @Post('ModifyPermission')
  @ApiBody({ type: updatePermissionDto })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async update(
    @Body() updatePermissionDto: updatePermissionDto,
  ): Promise<CommonResponse<Permission>> {
    const data = await this.permissionsService.update(
      updatePermissionDto.name,
      updatePermissionDto.permissionId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Permission updated successfully',
      data,
    };
  }

  @ApiBody({
    schema: {
      properties: {
        permissionId: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('read')
  @Post('OnePermissions')
  async getOne(
    @Body('permissionId') permissionId: string,
  ): Promise<CommonResponse<Permission>> {
    const data = await this.permissionsService.findOne(permissionId);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Permission fetched',
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('read')
  @Get('AllPermissions')
  async getAll(): Promise<CommonResponse<Permission[]>> {
    const data = await this.permissionsService.getAll();
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'All Permissions',
    };
  }

  @ApiBody({
    schema: {
      properties: {
        permissionId: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('delete')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete('DeletePermission')
  async Delete(
    @Body('permissionId') permissionId: string,
  ): Promise<CommonResponse<Permission>> {
    await this.permissionsService.Delete(permissionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Permission deleted succesfully',
    };
  }
}
