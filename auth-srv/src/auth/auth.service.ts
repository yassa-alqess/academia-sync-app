import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import UserAuthStrategy from './authStrategies/UserAuthStrategy';
import Verfication from 'src/shared/utils/verfication/Verfication';
import RefreshToken from 'src/shared/models/refresh-token';
import { Tokens } from 'src/shared/types/tokens.type';
import { JwtPayload } from 'src/shared/types/jswtPayload.type';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import * as bcrypt from 'bcrypt';
import ResetToken from 'src/shared/models/reset-token';
import User from 'src/shared/models/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private verficationProvider: Verfication,
  ) {}

  async signIn(email: string, pass: string): Promise<Tokens> {
    const strategy = new UserAuthStrategy(this.userService);
    const user = await strategy.login(email, pass);
    const access_token = await this.generateAccessToken(
      user.userId,
      user.email,
    );
    const refresh_token = await this.generateRefreshToken(
      user.userId,
      user.email,
    );
    return { access_token, refresh_token };
  }

  private async generateAccessToken(userId: string, email: string) {
    const jwtPayload: JwtPayload = { sub: userId, email };
    return this.generateToken(jwtPayload, 'at_secret', '15m');
  }

  private async generateRefreshToken(userId: string, email: string) {
    const jwtPayload: JwtPayload = { sub: userId, email};
    let refreshToken = await RefreshToken.findOne({
      where: {
        userId: userId,
        expiredAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!refreshToken) {
      const refresh_token = await this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('rt_secret'),
        expiresIn: '7d',
      });

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      refreshToken = await RefreshToken.create({
        token: refresh_token,
        expiredAt: expirationDate,
        userId: userId,
      });
    }

    return refreshToken.token;
  }

  private async generateToken(
    payload: JwtPayload,
    secretKey: string,
    expiresIn: string,
  ) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get<string>(secretKey),
      expiresIn,
    });
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const validRt = await this.isValidRefreshToken(refreshToken);
    if (!validRt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { sub, email } = await this.jwtService.decode(refreshToken);
    const access_token = await this.generateAccessToken(sub, email);

    return { access_token, refresh_token: refreshToken };
  }

  async isValidRefreshToken(refreshToken: string): Promise<boolean> {
    const storedToken = await RefreshToken.findOne({
      where: { token: refreshToken, expiredAt: { [Op.gt]: new Date() } },
    });
    return !!storedToken;
  }

  async register(user: any): Promise<any> {
    const strategy = new UserAuthStrategy(this.userService);
    return strategy.register(user);
  }

  async logout(userId: string): Promise<boolean> {
    await RefreshToken.update(
      { token: null },
      { where: { userId, token: { [Op.not]: null } } },
    );
    return true;
  }


  public async forgetPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    await this.verficationProvider.sendEmailVerficationCode(user);
  }

  async isOtpValidAndVerified(input: string): Promise<any> {
    const isValid = await this.verficationProvider.isOtpValidAndVerified(input);
    if (isValid) {
      return { isValid };
    } else {
      throw new UnauthorizedException('Invalid OTP');
    }
  }

  public async resetPassword(data: ResetPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    const isTheSame = await bcrypt.compare(
      data.newPassword,
      user.hashedPassowrd,
    );
    if (isTheSame) {
      throw new BadRequestException(
        'New password cannot be same as old password',
      );
    }
    await this.isOtpValidAndVerified(data.otp);
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await this.userService.updateUserPassword(user.userId, hashedPassword);
    await ResetToken.destroy({
      where: {
        userId: user.userId,
      },
    });
  }
}
