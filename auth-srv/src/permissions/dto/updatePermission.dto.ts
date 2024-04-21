import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class updatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissionId: string;
}

export const updatePermissionSchema = joi.object<updatePermissionDto>({
  name: joi.string().optional(),
  permissionId: joi.string().guid({
    version: 'uuidv4',
  }).required()
});
