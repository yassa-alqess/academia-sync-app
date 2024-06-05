import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  controllers: [ConversationsController],
  providers: [
    ConversationsService,
    ParticipantsService,
    UsersService,
    MessagesService,
  ],
})
export class ConversationsModule {}
