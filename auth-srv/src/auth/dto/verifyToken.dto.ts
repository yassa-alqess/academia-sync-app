import { OtpProvider } from 'src/shared/enums/OtpProvider';

export class verifyTokenDto {
  input: string;
  otp: string;
  provider: OtpProvider;
}
