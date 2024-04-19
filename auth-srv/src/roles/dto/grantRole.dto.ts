import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class grantRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: string[];
}

export const grantRoleSchema = joi.object<grantRoleDto>({
  name: joi.string().required(),
  permissions: joi.array().items(joi.string()),
});
