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
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, loginSchema } from './dto/loginUser.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/shared/joiValidations';
import { registerUserDto } from './dto/registerUser.dto';
import { CommonResponse } from 'src/shared/commonResponse';
import { RefreshTokenGuard } from './guards/refresh.token.guard';
import { AccessTokenGuard } from './guards/access.token.guard';
import { UnauthorizedException } from '@nestjs/common';
import { Tokens } from 'src/shared/types/tokens.type';
import { Throttle } from '@nestjs/throttler';
import { ResetPasswordDto, ResetPasswordSchema } from './dto/resetPassword.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: loginDto })
  @Post('login')
  async signIn(@Body(new JoiValidationPipe(loginSchema)) signInDto: loginDto) {
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
    @Body() signUpDto: registerUserDto,
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


  @ApiBody({
    schema: {
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(@Body() data: Record<string, any>): Promise<Tokens> {
    return this.authService.refreshTokens(data.token);
  }

  
  @ApiBody({
    schema: {
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('verifyotp')
  async verifyotp(
    @Body() data: Record<string, any>,
  ): Promise<CommonResponse<void>> {
    await this.authService.isOtpValidAndVerified(data.email);
    return {
      statusCode: HttpStatus.OK,
      message: 'Otp verified successfully',
    };
  }


  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @Post('forget')
  async forgetPassword(
    @Body() data: Record<string, any>,
  ): Promise<CommonResponse<void>> {
    await this.authService.forgetPassword(data.email);
    return {
      statusCode: HttpStatus.OK,
      message: 'Reset Password Link Sent Successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(ResetPasswordSchema))
  @ApiBody({
    type: ResetPasswordDto,
  })
  @Post('Reset')
  async resetPassword(
    @Body() data: ResetPasswordDto,
  ): Promise<CommonResponse<void>> {
    await this.authService.resetPassword(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password reseted successfully',
    };
  }
}
