import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { syncDatabase } from './config/database/connection';
import { seedRoles } from './shared/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  await syncDatabase(configService);
  const port = configService.get('PORT');
  await seedRoles()
    .then(() => {
      console.log('seeding done');
    })
    .catch((error) => {
      console.log(error);
    });

  // Set up Swagger documentation
  // http://localhost:${port}/swagger
  const options = new DocumentBuilder()
    .setTitle('Academia Auth API description')
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
