import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { FeedbacksService } from './feedbacks.service';
import { CommonResponse } from 'src/shared/commonResponse';
import Feedback from 'src/shared/models/feedback';

@ApiTags('Feedback')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @ApiResponse({
    status: 201,
    description: 'Feedback submitted successfully',
    type: Feedback,
  })
  @ApiBody({ type: CreateFeedbackDto })
  @Post('createFeedback')
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<CommonResponse<Feedback>> {
    const data = await this.feedbacksService.create(createFeedbackDto);
    return {
      message: 'Feedback submitted successfully',
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiBody({
    schema: {
      properties: {
        professorId: { type: 'string' },
      },
    },
  })
  @Post('getFeedbacks')
  async get(
    @Body('professorId') professorId: string,
  ): Promise<CommonResponse<Feedback[]>> {
    const data = await this.feedbacksService.get(professorId);
    return {
      message: 'Feedbacks fetched successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
