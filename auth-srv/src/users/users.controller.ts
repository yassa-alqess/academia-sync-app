import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Get,
  UsePipes,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { createUserDto, createUserSchema } from './dto/createUser.dto';
import { updateUserDto, updateUserSchema } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { JoiValidationPipe } from 'src/shared/joiValidations';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommonResponse } from 'src/shared/commonResponse';
import User from 'src/shared/models/user';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { JwtPayload } from 'src/shared/types/jswtPayload.type';
import { userDec } from 'src/shared/decorators/user.decorator';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Permissions } from 'src/shared/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('create')
  @Post('AddUser')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @ApiBody({ type: createUserDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: User,
  })
  async create(@Body() user: createUserDto): Promise<CommonResponse<User>> {
    const data = await this.usersService.create(user as any);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('update')
  @Put('updateUser')
  @ApiBody({ type: updateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: User,
  })
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(updateUserSchema)) user: updateUserDto,
  ): Promise<CommonResponse<User>> {
    const data = await this.usersService.update(id, { ...user });
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('update')
  @Delete('deleteUser')
  @UseGuards(AccessTokenGuard)
  async delete(@Body('userId') userId: string): Promise<CommonResponse<User>> {
    await this.usersService.delete(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Admin')
  @Permissions('read')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @Get('oneUser')
  async findUserById(
    @Body('userId') userId: string,
  ): Promise<CommonResponse<User>> {
    const data = await this.usersService.findUserById(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Student')
  @Permissions('update')
  @Get('profile')
  async profile(@userDec() user: JwtPayload): Promise<CommonResponse<User>> {
    const data = await this.usersService.findUserById(user.sub);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Student')
  @Permissions('update')
  @Put('profile')
  @ApiBody({ type: updateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    type: User,
  })
  async updateProfile(
    @userDec() payload: JwtPayload,
    @Body() user: updateUserDto,
  ): Promise<CommonResponse<User>> {
    const data = await this.usersService.update(payload.sub, user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User profile updated successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Student')
  @Permissions('delete')
  @Delete('profile')
  async deleteProfile(
    @userDec() user: JwtPayload,
  ): Promise<CommonResponse<void>> {
    await this.usersService.delete(user.sub);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
