import { UsersService } from 'src/users/users.service';
import Joi from 'Joi';
import { registerUserSchema } from '../dto/registerUser.dto';
import IAuthStrategy from './IAuthStrategy';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import User from 'src/shared/models/user';

export default class UserAuthStrategy implements IAuthStrategy {
  private registerSchema: Joi.ObjectSchema;
  constructor(private readonly userService: UsersService) {
    this.registerSchema = registerUserSchema;
  }

  async validateRegister(user: Record<string, any>): Promise<any> {
    try {
      const { error } = await this.registerSchema.validateAsync(user);
      if (error) {
        throw new BadRequestException(
          `Validation failed: ${error.details.map((x) => x.message.join(', '))}`,
        );
      }
    } catch (error) {
      if (error.isJoi) {
        throw new BadRequestException(
          `Validation failed: ${error.details.map((x) => x.message.join(', '))}`,
        );
      } else {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<Record<string, any>> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassowrd);
    if (!isMatch) {
      throw new NotFoundException('Invalid username or password');
    }
    if (user.deletedAt) {
      throw new NotFoundException('Invalid username or password');
    }
    return user;
  }

  async register(user: Record<string, any>): Promise<Record<string, any>> {
    await this.validateRegister(user);
    //verfication
    return await this.userService.create(user as User);
  }
}
