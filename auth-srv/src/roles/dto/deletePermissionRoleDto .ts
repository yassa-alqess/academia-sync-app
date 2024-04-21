import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class deletePermissionRoleDto {
  @ApiProperty()
  roleId: string;

  @ApiProperty()
  permissionId: string;
}

export const deletePermissionRoleSchema = joi.object<deletePermissionRoleDto>({
  roleId: joi
    .string()
    .guid({
      version: 'uuidv4',
    })
    .required(),
  permissionId: joi
    .string()
    .guid({
      version: 'uuidv4',
    })
    .required(),
});
