import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  name: string;
}

export const creatConversationSchema = Joi.object<createUserDto>({
  name: Joi.string().required(),
});
