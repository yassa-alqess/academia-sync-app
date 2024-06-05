import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParticipantsService } from 'src/participants/participants.service';
import { creatConversationDto } from './dto/createConversation.dto';
import User from 'src/shared/models/user';
import Conversation from 'src/shared/models/conversation';
import { UsersService } from 'src/users/users.service';
import Participant from 'src/shared/models/participant';
import ParticipantConversation from 'src/shared/models/participantConversation';
import Message from 'src/shared/models/message';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly userService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}
  async create(user: User, data: creatConversationDto): Promise<Conversation> {
    const participants: Participant[] = [];

    if (!user.participant) {
      const newParticipant = await this.participantsService.create(data.userId);
      user.participantId = newParticipant.participantId;
      await user.save();
      participants.push(newParticipant);
    } else {
      participants.push(user.participant);
    }

    const recipient = await this.userService.findById(data.recipientId);
    if (!recipient) {
      throw new NotFoundException('User not found');
    }
    if (!recipient.participant) {
      const newParticipant = await this.participantsService.create(
        data.recipientId,
      );
      recipient.participantId = newParticipant.participantId;
      await recipient.save();
      participants.push(newParticipant);
    } else {
      participants.push(recipient.participant);
    }

    const existedConversation1 = await ParticipantConversation.findAll({
      where: {
        participantId: user.participantId,
      },
    });
    const existedConversation2 = await ParticipantConversation.findAll({
      where: {
        participantId: recipient.participantId,
      },
    });

    if (existedConversation1.length > 0 && existedConversation2.length > 0) {
      throw new BadRequestException('Conversation already exists');
    }

    const conversation = await Conversation.create({});

    for (const participant of participants) {
      await ParticipantConversation.create({
        participantId: participant.participantId,
        conversationId: conversation.conversationId,
      });
    }

    await this.messagesService.create({
      participantId: user.participantId,
      text: data.text,
      conversationId: conversation.conversationId,
      userId: user.userId,
    });

    const savedConversation = await this.getById(conversation.conversationId);

    return savedConversation;
  }

  async getById(id: string): Promise<any> {
    const conversation = await Conversation.findByPk(id, {
      include: [
        {
          model: Participant,
          include: [{ model: User }],
        },
        {
          model: Message,
        },
      ],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    const messagesWithUser = conversation.messages.map((message) => {
      const participant = conversation.participants.find(
        (p) => p.participantId === message.participantId,
      );
      return {
        ...message.toJSON(),
        user: participant ? participant.user : null,
      };
    });

    return {
      ...conversation.toJSON(),
      messages: messagesWithUser,
    };
  }

  async getByUser(userId: string) {
    const user = await User.findByPk(userId, {
      include: [Participant],
    });

    if (!user || !user.participant) {
      throw new NotFoundException('User or Participant not found');
    }

    const participantConversations = await ParticipantConversation.findAll({
      attributes: ['conversationId'],
      where: { participantId: user.participant.participantId },
    });

    const conversationIds = participantConversations.map(
      (pc) => pc.conversationId,
    );

    const conversations = await Conversation.findAll({
      where: {
        conversationId: conversationIds,
      },
      include: [
        {
          model: Participant,
          include: [{ model: User }],
        },
        {
          model: Message,
        },
      ],
      attributes: ['conversationId', 'createdAt', 'updatedAt'],
    });

    const conversationsWithRecipientsAndCreators = conversations.map((conv) => {
      const recipients = [];
      const creator = [];
      conv.participants.forEach((participant) => {
        if (participant.participantId !== user.participant.participantId) {
          recipients.push(participant);
        } else {
          creator.push(participant);
        }
      });

      const messagesWithUserId = conv.messages.map((message) => {
        const participant = conv.participants.find(
          (p) => p.participantId === message.participantId,
        );
        return {
          ...message.toJSON(),
          user: participant ? participant.user : null,
        };
      });

      return {
        conversationId: conv.conversationId,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        recipient: recipients,
        creator: creator,
        messages: messagesWithUserId,
      };
    });

    return conversationsWithRecipientsAndCreators;
  }
}
