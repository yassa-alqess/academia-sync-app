import { Injectable } from '@nestjs/common';
import { joiValidator } from '../joi/joiValidator';
import Joi from 'joi';
import VerificationCodeGenerator from '../code-generator/VerificationCodeGenerator';
import ResetToken from 'src/shared/models/reset-token';
import moment from 'moment';
import { MailService } from 'src/mail/mail.service';
import { Op } from 'sequelize';
import User from 'src/shared/models/user';

@Injectable()
export default class Verfication {
  private readonly verificationCodeGenerator: VerificationCodeGenerator;
  constructor(private mailService: MailService) {
    this.verificationCodeGenerator = new VerificationCodeGenerator();
  }

  async sendEmailVerficationCode(user: User): Promise<void> {
    joiValidator(
      { email: user.email },
      Joi.object({
        email: Joi.string().email().required(),
      }),
    );
    let { code } = await this.generateCode();
    await this.setOtpUserCode(code, user);
    console.log(user, code)
    await this.mailService.sendForgetPasswordEmail(user.email, code, 3);
  }

  async isOtpValidAndVerified(input: string): Promise<boolean> {
    const userCode = await ResetToken.findOne({
      where: {
        otp: input,
        expiredAt: {
          [Op.gt]: new Date(),
        },
      },
    });
    console.log(userCode)
    return !!userCode;
  }

  public async generateCode(): Promise<{ code: string }> {
    let code = this.verificationCodeGenerator.generateCode();
    return { code };
  }

  async setOtpUserCode(code: string, user: User) {
    const existingCode = await ResetToken.findOne({
      where: {
        otp: code,
      },
    });
    if (existingCode) {
      await existingCode.update({
        expiredAt: moment().add(3, 'minutes').toDate(),
      });
    } else {
      await ResetToken.create({
        otp: code,
        expiredAt: moment().add(3, 'minutes').toDate(),
        userId: user.userId,
      });
    }
  }
}
