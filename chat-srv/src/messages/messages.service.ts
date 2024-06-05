import { Injectable } from '@nestjs/common';
import Message from 'src/shared/models/message';
import { createMessageDto } from './dto/createMessage.dto';
import User from 'src/shared/models/user';
import Participant from 'src/shared/models/participant';
import Conversation from 'src/shared/models/conversation';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MessagesService {
  async create(data: createMessageDto) {
    const user = await User.findByPk(data.userId, {
      include: [Participant],
    });

    if (!user || !user.participant) {
      throw new NotFoundException('User or Participant not found');
    }

    const conversation = await Conversation.findByPk(data.conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const message = await Message.create({
      participantId: user.participant.participantId,
      text: data.text,
      conversationId: data.conversationId,
    });

    return {
      message: message,
      user: user,
    };
  }

  async getMessagesByConversationId(data: createMessageDto) {
    const messages = await Message.findAll({
      where: {
        conversationId: data.conversationId,
      },
      order: [['createdAt', 'DESC']],
    });

    const messagesWithUser = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findOne({
          where: {
            participantId: message.participantId,
          },
        });

        return {
          ...message.toJSON(),
          user: user ? user.toJSON() : null,
        };
      }),
    );

    return {
      messages: messagesWithUser,
    };
  }
}
