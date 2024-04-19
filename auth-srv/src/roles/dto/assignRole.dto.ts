import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class assignRoleDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  roleId: string;
}

export const assignRoleSchema = joi.object<assignRoleDto>({
  userId: joi.string().required(),
  roleId: joi.string().required(),
});
