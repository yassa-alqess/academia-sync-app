import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class createMessageDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  conversationId: string;

  @ApiProperty()
  text: string;

  participantId: string;
}

export const creatMessageSchema = Joi.object<createMessageDto>({
  text: Joi.string().required(),
  userId: Joi.string().required(),
  conversationId: Joi.string().required(),
});
