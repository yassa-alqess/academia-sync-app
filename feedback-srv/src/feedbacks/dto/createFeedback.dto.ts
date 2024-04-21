import { ApiProperty } from '@nestjs/swagger';
import joi from 'joi';

export class createFeedbackDto {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  submitted_at: Date;

  @ApiProperty()
  rate: number;
}

export const createFeedbackSchema = joi.object<createFeedbackDto>({
  comment: joi.string().required(),
  submitted_at: joi.date().required(),
  rate: joi.number().min(1).max(5).required(),
});
