import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import config from '../jest.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import {ValidationPipe} from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('token')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
