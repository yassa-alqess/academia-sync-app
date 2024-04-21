import { Injectable } from '@nestjs/common';
import Feedback from 'src/shared/models/feedback';
import { createFeedbackDto } from './dto/createFeedback.dto';

@Injectable()
export class FeedbacksService {
  async create(data: createFeedbackDto): Promise<Feedback> {
    const feedback = await Feedback.create({
      ...data,
    });
    return feedback;
  }

  async get(userId: string): Promise<Feedback[]> {
    const feedbacks = await Feedback.findAll({
      where: { userId: userId },
    });
    return feedbacks;
  }
}
