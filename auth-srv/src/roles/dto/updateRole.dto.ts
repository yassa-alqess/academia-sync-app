import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class updateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  roleId: string

  @ApiProperty()
  permissions: string[];
}

export const updateRoleSchema = joi.object<updateRoleDto>({
  name: joi.string().optional(),
  permissions: joi.array().items(joi.string().optional()),
  roleId: joi.string().required(),
});
