import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createPreferenceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  preferenceType: string;

}

export const createPreferenceSchema = joi.object<createPreferenceDto>({
  name: joi.string().required(),
  value: joi.string().required(),
  preferenceType: joi.string().required(),
});
