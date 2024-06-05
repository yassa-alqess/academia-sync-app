import { Injectable, NotFoundException } from '@nestjs/common';
import Participant from 'src/shared/models/participant';
import User from 'src/shared/models/user';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  async create(data: createUserDto): Promise<User> {
    return await User.create({ ...data });
  }

  async findByName(name: string): Promise<User> {
    const user = await User.findOne({
      where: {
        name: name,
      },
      include: [Participant],
    });
    if (!user) {
      throw new NotFoundException('User is not Found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await User.findByPk(id, {
      include: [Participant],
    });
    if (!user) {
      throw new NotFoundException('User is not Found');
    }
    return user;
  }
}
