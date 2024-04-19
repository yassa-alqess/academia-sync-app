import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { createPreferenceDto } from './dto/createPreference.dto';
import { updatePreferenceDto } from './dto/updatePreference.dto';
import { userDec } from 'src/shared/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types/jswtPayload.type';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { rulesGuard } from 'src/auth/guards/roles.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';

@ApiBearerAuth()
@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Student')
  @Permissions('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    type: createPreferenceDto,
  })
  @UseGuards(AccessTokenGuard)
  @Post('AddPreference')
  async create(
    @userDec() user: JwtPayload,
    @Body() preferenceData: createPreferenceDto,
  ) {
    return this.preferencesService.create(user.sub, preferenceData);
  }

  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Student')
  @Permissions('update')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBody({
    type: updatePreferenceDto,
  })
  @UseGuards(AccessTokenGuard)
  @Put('ModifyPreference')
  async update(
    @userDec() user: JwtPayload,
    @Body() 
    preferenceData: updatePreferenceDto,
  ) {
    return this.preferencesService.update(
      user.sub,
      preferenceData,
    );
  }

  @ApiBody({
    schema: {
      properties: {
        preferenceId: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(AccessTokenGuard, rulesGuard, PermissionGuard)
  @Roles('Student')
  @Permissions('delete')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(AccessTokenGuard)
  @Delete('DeletePreference')
  async delete(
    @userDec() user: JwtPayload,
    @Body('preferenceId') preferenceId: string,
  ) {
    return this.preferencesService.delete(user.sub, preferenceId);
  }
}
