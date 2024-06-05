import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class creatConversationDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  recipientId: string;

  @ApiProperty()
  userId: string;
}
export class getConversationDto {
  @ApiProperty()
  id: string;
}

export const creatConversationSchema = Joi.object<creatConversationDto>({
  text: Joi.string().required(),
  recipientId: Joi.string().required(),
  userId: Joi.string().required(),
});
