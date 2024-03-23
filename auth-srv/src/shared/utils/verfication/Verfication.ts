import { Injectable } from '@nestjs/common';
import { joiValidator } from '../joi/joiValidator';
import Joi from 'joi';
import VerificationCodeGenerator from '../code-generator/VerificationCodeGenerator';
import ResetToken from 'src/shared/models/reset-token';
import moment from 'moment';

@Injectable()
export default class Verfication {
  private readonly verificationCodeGenerator: VerificationCodeGenerator;
  constructor() {
    this.verificationCodeGenerator = new VerificationCodeGenerator();
  }

  async sendEmailVerficationCode(
    email: string,
    userType: string,
  ): Promise<void> {
    joiValidator(
      { email: email },
      Joi.object({
        email: Joi.string().email().required(),
      }),
    );
    let { code, hashedCode } = await this.generateCode();
    await this.setOtpUserCode(hashedCode);
  }

  async isOtpValid(input: string, code: string): Promise<boolean> {
    const userCode = await ResetToken.findOne({
      where: {
        otp: input,
      },
    });
    if (userCode) {
      if (this.verificationCodeGenerator.verifyCode(code, userCode.otp)) {
        if (moment().toDate() < moment(userCode.expiredAt).toDate()) {
          return true;
        }
      }
    }
    return false;
  }

  public async generateCode(): Promise<{ code: string; hashedCode: string }> {
    let code = this.verificationCodeGenerator.generateCode();
    let hashedCode = this.verificationCodeGenerator.hash(code);
    return { code, hashedCode };
  }

  public async setOtpUserCode(input: string) {
    const userCode = await ResetToken.findOne({
      where: {
        otp: input,
      },
    });
    if (userCode) {
      await ResetToken.update;
    } else {
      await ResetToken.create({
        otp: input,
        expiredAt: moment().add(3, 'minutes').toDate(),
        userId: '',
      });
    }
  }
}
