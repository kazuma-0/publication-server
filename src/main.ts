import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
