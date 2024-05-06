import { createMessageDto } from './dto/createMessage.dto';
import { MessagesService } from './messages.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import Message from 'src/shared/models/message';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(
    @Body()
    createMessageDto: createMessageDto,
  ): Promise<Message> {
    return await this.messagesService.create(createMessageDto);
  }

  @Get()
  async get(@Body() chatRoomId: string): Promise<Message[]> {
    return await this.messagesService.get(chatRoomId);
  }
}
