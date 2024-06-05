import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { creatConversationDto } from './dto/createConversation.dto';
import { UsersService } from 'src/users/users.service';
import { ConversationsService } from './conversations.service';
import Conversation from 'src/shared/models/conversation';
import { getConversationDto } from './dto/createConversation.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly userService: UsersService,
  ) {}

  @ApiBody({
    type: creatConversationDto,
  })
  @ApiResponse({
    status: 201,
    type: Conversation,
    description: 'conversations created successfully',
  })
  @Post()
  async create(@Body() data: creatConversationDto) {
    try {
      const userDB = await this.userService.findById(data.userId);
      const conversation = await this.conversationsService.create(userDB, data);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conversation created successfully',
        conversation,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'User conversations retrieved successfully',
  })
  @Get('user')
  async getByUser(@Body() data: creatConversationDto) {
    try {
      const conversations = await this.conversationsService.getByUser(
        data.userId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'User conversations retrieved successfully',
        conversations,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({
    type: getConversationDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Conversation retrieved successfully',
  })
  @Get('id')
  async getById(@Body() data: getConversationDto) {
    try {
      const conversation = await this.conversationsService.getById(data.id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Conversation retrieved successfully',
        conversation,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
