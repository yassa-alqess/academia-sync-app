import { createPreferenceDto } from './createPreference.dto';

import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class updatePreferenceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  preferenceType: string;

  @ApiProperty()
  preferenceId: string
}

export const updatePreferenceSchema = joi.object<updatePreferenceDto>({
  name: joi.string().optional(),
  value: joi.string().optional(),
  preferenceType: joi.string().optional(),
  preferenceId: joi.string().required()
});
