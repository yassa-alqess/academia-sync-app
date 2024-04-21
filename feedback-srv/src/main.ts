import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { syncDatabase } from './config/database/connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  await syncDatabase(configService)

  const port = configService.get('PORT');

  // Set up Swagger documentation
  // http://localhost:${port}/swagger
  const options = new DocumentBuilder()
    .setTitle('Academia Feedback API description')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // Enable CORS
  app.enableCors();

  // Start the application
  await app.listen(port);
}
bootstrap();
