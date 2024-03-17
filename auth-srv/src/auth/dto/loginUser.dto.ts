import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export const loginSchema = Joi.object<loginDto>().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
