import { Injectable } from '@nestjs/common';
import Feedback from 'src/shared/models/feedback';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import User from 'src/shared/models/user';

@Injectable()
export class FeedbacksService {
  async create(data: CreateFeedbackDto): Promise<Feedback> {
    try {
      const feedback = await Feedback.create({ ...data });
      return feedback;
    } catch (error) {
      throw new Error('Error creating feedback');
    }
  }

  async get(professorId: string): Promise<Feedback[]> {
    try {
      const feedbacks = await Feedback.findAll({
        where: { professor_id: professorId },
        include: [User],
      });
      return feedbacks;
    } catch (error) {
      throw new Error('Error fetching feedbacks');
    }
  }
}
