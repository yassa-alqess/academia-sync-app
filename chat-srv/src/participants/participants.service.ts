import { Injectable } from '@nestjs/common';
import Participant from 'src/shared/models/participant';
import { Body } from '@nestjs/common';

@Injectable()
export class ParticipantsService {
  async create(userId: string): Promise<Participant> {
    return await Participant.create({
      userId: userId,
    });
  }

  async findOrCreate(): Promise<Participant> {
    return;
  }

  async findById(@Body() id: string): Promise<Participant> {
    return await Participant.findByPk(id);
  }
}
