import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty()
  displayName: string;

  @ApiProperty()
  arabicName: string;

  @ApiProperty()
  hashedPassowrd: string;

  @ApiProperty()
  departmentName: string;

  @ApiProperty()
  group: string;
}

export const updateUserSchema = Joi.object<updateUserDto>().keys({
  displayName: Joi.string().optional(),
  arabicName: Joi.string().optional(),
  hashedPassowrd: Joi.string().optional().min(8).max(20).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_-]).{8,20}$')),
  departmentName: Joi.string().required(),
  group: Joi.string().required().max(2),
});
