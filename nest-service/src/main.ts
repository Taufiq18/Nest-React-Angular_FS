import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Memberikan akses route dengan cors
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  // Mengubah port yang digunakan dari 3000 menjadi 3002
  await app.listen(3002);
}
bootstrap();
