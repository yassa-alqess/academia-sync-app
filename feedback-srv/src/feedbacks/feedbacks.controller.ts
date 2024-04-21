import { FeedbacksService } from './feedbacks.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { createFeedbackDto } from './dto/createFeedback.dto';
import { CommonResponse } from 'src/shared/commonResponse';
import Feedback from 'src/shared/models/feedback';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @ApiResponse({
    status: 201,
    description: 'Feedback submitted succesfully',
    type: Feedback,
  })
  @ApiBody({
    type: createFeedbackDto,
  })
  @Post('craeteFeedback')
  async create(
    @Body() createFeedbackDto: createFeedbackDto,
  ): Promise<CommonResponse<Feedback>> {
    const data = await this.feedbacksService.create(createFeedbackDto);
    return {
      message: 'Feedback submitted succesfully',
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
        },
      },
    },
  })
  @Post('getFeedbacks')
  async get(
    @Body('userId') userId: string,
  ): Promise<CommonResponse<Feedback[]>> {
    const data = await this.feedbacksService.get(userId);
    return {
      message: 'Feedbacks fetched succesfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
