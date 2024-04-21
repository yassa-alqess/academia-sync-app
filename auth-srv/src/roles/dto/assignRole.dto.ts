import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class assignRoleDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  roleId: string;
}

export const assignRoleSchema = joi.object<assignRoleDto>({
  userId: joi
    .string()
    .guid({
      version: 'uuidv4',
    })
    .required(),
  roleId: joi
    .string()
    .guid({
      version: 'uuidv4',
    })
    .required(),
});
