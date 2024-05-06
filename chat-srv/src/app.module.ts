import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { configuration } from './config/env';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [configuration],
    }),
    MessagesModule,
    ChatRoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
