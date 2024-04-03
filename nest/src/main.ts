/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });
  await app.listen(3000);
  console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
