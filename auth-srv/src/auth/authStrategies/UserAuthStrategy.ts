import { UsersService } from 'src/users/users.service';
import Joi from "joi";
import { registerUserSchema } from '../dto/registerUser.dto';
import IAuthStrategy from './IAuthStrategy';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { createUserDto } from 'src/users/dto/createUser.dto';

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
    email: string,
    password: string,
  ): Promise<Record<string, any>> {
    const user = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.hashedPassowrd);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    if (user.deletedAt) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async register(user: createUserDto): Promise<Record<string, any>> {
    await this.validateRegister(user);
    const userr = await this.userService.create(user);
    return userr;
  }
}
