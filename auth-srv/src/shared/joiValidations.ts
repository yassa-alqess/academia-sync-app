import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  async transform(value: any) {
    try {
      const { error } = await this.schema.validateAsync(value);
      if (error) {
        throw new BadRequestException(
          `Validation failed: ${error.details.map((x) => x.message).join(', ')}`,
        );
      }
      return value;
    } catch (error) {
      if (error.isJoi)
        throw new BadRequestException(
          `Validation failed: ${error.details.map((x) => x.message).join(', ')}`,
        );
      else throw new BadRequestException(`Validation failed: ${error.message}`);
    }
  }
}
