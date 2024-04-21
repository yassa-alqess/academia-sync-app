import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/env';
import { FeedbacksModule } from './feedbacks/feedbacks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [configuration],
    }),
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
