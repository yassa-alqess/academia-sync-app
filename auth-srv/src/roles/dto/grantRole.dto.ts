import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class grantRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissionIds: string[];
}

export const grantRoleSchema = joi.object<grantRoleDto>({
  name: joi.string().required(),
  permissionIds: joi.array().items(
    joi
      .string()
      .guid({
        version: 'uuidv4',
      })
      .required(),
  ),
});
