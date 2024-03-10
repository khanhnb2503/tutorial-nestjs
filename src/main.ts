import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { swaggerConfig } from './configs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  swaggerConfig(app)

  console.log('http://localhost:5000')
  await app.listen(5000);
}
bootstrap();
