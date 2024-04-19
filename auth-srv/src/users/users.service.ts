import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import User from 'src/shared/models/user';
import bcrypt from 'bcrypt';
import Preference from 'src/shared/models/preferences';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor() {}
  async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [Preference],
    });

    if (user) {
      return user;
    }

    throw new NotFoundException(`ْUser not found`);
  }

  async findAll(): Promise<User[]> {
    return await User.findAll({
      include: [Preference],
    });
  }

  async create(user: createUserDto): Promise<User> {
    const exists = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    user.hashedPassowrd = bcrypt.hashSync(user.hashedPassowrd, 10);

    const createdUser = await User.create({
      ...user,
    });

    return createdUser;
  }

  async update(id: string, user: updateUserDto): Promise<User> {
    const exists = await User.findByPk(id);
    if (!exists) {
      throw new NotFoundException('User not Found');
    }
    const updatedUser = await exists.update({
      ...user,
    });

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await user.update({
      isDeleted: true,
    });
  }

  async findUserById(id: string): Promise<User> {
    const user = await User.findByPk(id, {
      include: [Preference],
    });
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  async updateUserPassword(id: string, password: string): Promise<any> {
    return await User.update(
      {
        hashedPassowrd: password,
      },
      {
        where: {
          userId: id,
        },
      },
    );
  }
}
