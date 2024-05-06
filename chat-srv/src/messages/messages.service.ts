import { Injectable } from '@nestjs/common';
import Message from 'src/shared/models/message';
import { createMessageDto } from './dto/createMessage.dto';
import User from 'src/shared/models/user';
import ChatRoom from 'src/shared/models/chatRoom';

@Injectable()
export class MessagesService {
  async create(createMessageDto: createMessageDto): Promise<Message> {
    return await Message.create({
      text: createMessageDto.text,
      chatRoomId: createMessageDto.chatRoomId,
      userId: createMessageDto.userId,
    });
  }

  async get(chatRoomId: string): Promise<Message[]> {
    return await Message.findAll({
      include: [User, ChatRoom],
      where: {
        chatRoomId: chatRoomId,
      },
    });
  }
}
