import { Controller, Post, Get, Body } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { createChatRoomDTo } from './dto/createChatRoom.dto';
import ChatRoom from 'src/shared/models/chatRoom';

@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly ChatRoomsService: ChatRoomsService) {}

  @Post()
  async create(
    @Body() createChatRoomDTo: createChatRoomDTo,
  ): Promise<ChatRoom> {
    return await this.ChatRoomsService.create(createChatRoomDTo);
  }

  @Get()
  async get(@Body() userId: string): Promise<ChatRoom[]> {
    return await this.ChatRoomsService.get(userId);
  }
}
