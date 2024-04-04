import crypto from 'crypto';

export default class VerificationCodeGenerator {
  private readonly codeLength: number;

  constructor(codeLength: number = 6) {
    this.codeLength = codeLength;
  }

  generateCode(): string {
    const code = crypto.randomInt(Math.pow(10, this.codeLength)).toString();
    return code.padStart(this.codeLength, '0');
  }
}
