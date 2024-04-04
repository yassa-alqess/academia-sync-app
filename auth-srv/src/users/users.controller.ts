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
} from '@nestjs/swagger';
import { CommonResponse } from 'src/shared/commonResponse';
import User from 'src/shared/models/user';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { JwtPayload } from 'src/shared/types/jswtPayload.type';
import { userDec } from 'src/shared/decorators/user.decorator';

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

  @UseGuards(AccessTokenGuard)
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
    const data = await this.usersService.update(id, { ...user } as User);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data,
    };
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id') id: string): Promise<CommonResponse<User>> {
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @UseGuards(AccessTokenGuard)
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
  async findUserById(@Param('id') id: string): Promise<CommonResponse<User>> {
    const data = await this.usersService.findUserById(id.trim());
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async profile(@userDec() user: JwtPayload): Promise<CommonResponse<User>> {
    const data = await this.usersService.findUserById(user.sub);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard)
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
    const data = await this.usersService.update(payload.sub, user as User);
    return {
      statusCode: HttpStatus.OK,
      message: 'User profile updated successfully',
      data,
    };
  }

  @Delete('profile')
  @UseGuards(AccessTokenGuard)
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
