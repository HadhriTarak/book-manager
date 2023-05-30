import { NestFactory } from '@nestjs/core';
import { AppModule } from './jobs.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3003);
}
bootstrap();
