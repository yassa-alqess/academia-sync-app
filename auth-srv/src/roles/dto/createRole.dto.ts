import joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createRoleDto {
  @ApiProperty()
  name: string;
}

export const createRoleSchema = joi.object<createRoleDto>({
  name: joi.string().required(),
});
