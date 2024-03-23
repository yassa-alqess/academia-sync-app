import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
  Headers,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, loginSchema } from './dto/loginUser.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/shared/joiValidations';
import { registerUserDto } from './dto/registerUser.dto';
import { CommonResponse } from 'src/shared/commonResponse';
import { Role } from 'src/shared/enums/role.enum';
import { RefreshTokenGuard } from './guards/refresh.token.guard';
import { AccessTokenGuard } from './guards/access.token.guard';
import { UnauthorizedException } from '@nestjs/common';
import { Tokens } from 'src/shared/types/tokens.type';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: loginDto })
  @Post('login')
  async signIn(
    @Body(new JoiValidationPipe(loginSchema)) signInDto: Record<string, any>,
  ) {
    const data = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data,
    };
  }

  @ApiBody({ type: registerUserDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(
    @Body() signUpDto: Record<string, any>,
  ): Promise<CommonResponse<any>> {
    const data = await this.authService.register(signUpDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req): Promise<boolean> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(@Body() refresh_token: string): Promise<Tokens> {
    const refreshToken = refresh_token;
    return this.authService.refreshTokens(refreshToken);
  }
}
