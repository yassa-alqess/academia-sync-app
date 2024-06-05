import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: createUserDto) {
    return await this.userService.create(data);
  }

  @Get()
  async findByName(@Body() data: createUserDto) {
    return await this.userService.findByName(data.name);
  }

  @Get()
  async findById(@Body() id: string) {
    return await this.userService.findById(id);
  }
}
