import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class updateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  roleId: string;

  @ApiProperty()
  permissionsIds: string[];
}

export const updateRoleSchema = joi.object<updateRoleDto>({
  name: joi.string().optional(),
  permissionsIds: joi.array().items(
    joi
      .string()
      .guid({
        version: 'uuidv4',
      })
      .optional(),
  ),
  roleId: joi
    .string()
    .guid({
      version: 'uuidv4',
    })
    .required(),
});
