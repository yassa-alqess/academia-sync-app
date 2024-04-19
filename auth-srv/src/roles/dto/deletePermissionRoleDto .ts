import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class deletePermissionRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissionId: string;
}

export const deletePermissionRoleSchema = joi.object<deletePermissionRoleDto>({
  name: joi.string().required(),
  permissionId: joi.string().required(),
});
