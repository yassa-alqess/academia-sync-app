import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly from: string;
  constructor(private readonly mailerService: MailerService) {
    this.from = 'Graduation Project';
  }
  async sendForgetPasswordEmail(
    email: string,
    code: string,
    expireTime: number,
  ) {
    await this.mailerService.sendMail({
      from: this.from,
      to: email,
      subject: 'Forget Password',
      template: './forgetPassword',
      context: {
        code,
        expire: expireTime,
      },
    });
  }
}
