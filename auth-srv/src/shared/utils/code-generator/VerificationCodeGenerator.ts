import crypto from 'crypto';

export default class VerificationCodeGenerator {
  private readonly codeLength: number;
  private readonly hashAlgoritm: string;

  constructor(codeLength: number = 6, hashAlgoritm: string = 'sha256') {
    this.codeLength = codeLength;
    this.hashAlgoritm = hashAlgoritm;
  }

  generateCode(): string {
    const code = crypto.randomInt(Math.pow(10, this.codeLength)).toString();
    return code.padStart(this.codeLength, '0');
  }

  hash(code: string): string {
    const hash = crypto.createHash(this.hashAlgoritm);
    hash.update(code);
    return hash.digest('hex');
  }

  verifyCode(code: string, input: string): boolean {
    const hashedCode = this.hash(code);
    return hashedCode === input;
  }
}
