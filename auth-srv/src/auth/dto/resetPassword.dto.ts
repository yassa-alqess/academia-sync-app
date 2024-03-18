import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class ResetPasswordDto {
  @ApiProperty()
  otp: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  newPassword: string;
}

export const ResetPasswordSchema = Joi.object<ResetPasswordDto>().keys({
  otp: Joi.string().required(),
  email: Joi.string().email().required(),
  newPassword: Joi.string()
    .required()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$',
      ),
    ),
});
