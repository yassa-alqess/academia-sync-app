import { ApiProperty } from '@nestjs/swagger';
import joi from 'joi';
export class CreateFeedbackDto {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  submitted_at: Date;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  professor_id: string;

  @ApiProperty()
  student_id: string; 
}

export const createFeedbackSchema = joi.object<CreateFeedbackDto>({
  comment: joi.string().required(),
  submitted_at: joi.date().required(),
  rate: joi.number().min(1).max(5).required(),
  professor_id: joi.string().guid({ version: 'uuidv4' }).required(),
  student_id: joi.string().guid({ version: 'uuidv4' }).required(), 
});
