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
} from '@nestjs/common';
import { createUserDto, createUserSchema } from './dto/createUser.dto';
import { updateUserDto, updateUserSchema } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { JoiValidationPipe } from 'src/shared/joiValidations';
import {
  ApiBasicAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CommonResponse } from 'src/shared/commonResponse';
import User from 'src/shared/models/user';

@ApiBasicAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
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

  @Put(':id')
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
    const data = await this.usersService.update(+id, { ...user } as User);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<CommonResponse<User>> {
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CommonResponse<User>> {
    const data = await this.usersService.findUserById(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }
}
