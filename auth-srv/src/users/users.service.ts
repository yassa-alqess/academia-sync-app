import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import User from 'src/shared/models/user';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor() {}
  async findOne(email: string): Promise<User> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException(`ْUser not found`);
  }

  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async create(user: User): Promise<User> {
    const exists = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    user.hashedPassowrd = bcrypt.hashSync(user.hashedPassowrd, 10);
    return await User.create({
      data: {
        ...user,
      },
    });
  }

  async update(id: number, user: User): Promise<any> {
    const exists = await User.findByPk(id);
    if (!exists) {
      throw new NotFoundException('User not Found');
    }
    return await exists.update({
      data: {
        ...user,
      },
    });
  }

  async delete(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await user.update({
      isDeleted: true,
    });
  }

  async findUserById(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }
}
