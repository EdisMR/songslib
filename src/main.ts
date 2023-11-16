import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* cors for localhost */
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,HEAD,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  
  await app.listen(environment.app_port);
}
bootstrap();
