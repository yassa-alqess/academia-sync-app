import { UsersService } from 'src/users/users.service';
import Joi from "joi";
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
    email: string,
    password: string,
  ): Promise<Record<string, any>> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassowrd);
    if (!isMatch) {
      throw new NotFoundException('Invalid email or password');
    }
    if (user.deletedAt) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }

  async register(user: Record<string, any>): Promise<Record<string, any>> {
    await this.validateRegister(user);
    const userr = await this.userService.create(user as User);
    return userr;
  }
}
