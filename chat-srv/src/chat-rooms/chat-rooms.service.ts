import { createChatRoomDTo } from './dto/createChatRoom.dto';
import { Injectable } from '@nestjs/common';
import ChatRoom from 'src/shared/models/chatRoom';
import ChatRoomUser from 'src/shared/models/chatRoom-user';
import Message from 'src/shared/models/message';
import User from 'src/shared/models/user';

@Injectable()
export class ChatRoomsService {
  async create(createChatRoomDTo: createChatRoomDTo): Promise<ChatRoom> {
    const chatRoom = await ChatRoom.create({
      name: `${createChatRoomDTo.senderId} - ${createChatRoomDTo.recieverId}`,
    });

    await ChatRoomUser.bulkCreate([
      { userId: createChatRoomDTo.senderId, chatRoomId: chatRoom.chatRoomId },
      { userId: createChatRoomDTo.recieverId, chatRoomId: chatRoom.chatRoomId },
    ]);

    return chatRoom;
  }

  async get(userId: string): Promise<ChatRoom[]> {
    return await ChatRoom.findAll({
      include: [ChatRoom, Message, User],
      where: {
        userId: userId,
      },
    });
  }
}
