import { Body, Controller, Post, Get, HttpStatus, HttpException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { createMessageDto } from './dto/createMessage.dto';
import Message from 'src/shared/models/message';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private eventEmitter: EventEmitter2,
  ) {}

  @ApiBody({
    type: createMessageDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Message created successfully',
  })
  @Post()
  async create(@Body() data: createMessageDto) {
    try {
      const message = await this.messagesService.create(data);
      this.eventEmitter.emit('message.create', message);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Message created successfully',
        data: message,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async get(@Body() data: createMessageDto) {
    return await this.messagesService.getMessagesByConversationId(data);
  }
}
