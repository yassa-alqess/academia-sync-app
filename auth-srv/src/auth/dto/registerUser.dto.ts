import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class registerUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  academicId: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  arabicName: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  hashedPassowrd: string;

  @ApiProperty()
  departmentName: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  role: string;
}

export const registerUserSchema = Joi.object<registerUserDto>().keys({
  email: Joi.string().required(),
  academicId: Joi.string().required(),
  displayName: Joi.string().required(),
  arabicName: Joi.string().required(),
  gender: Joi.string().required(),
  // strong password Aa1235678@
  hashedPassowrd: Joi.string()
    .required()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_-]).{8,20}$',
      ),
    ),
  departmentName: Joi.string().required(),
  group: Joi.string().required().max(2),
  role: Joi.string().required(),
});
