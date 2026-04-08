import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const webUrl = process.env.WEB_URL ?? 'http://localhost:3000';
  const port = process.env.PORT ?? 9999;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: webUrl,
  });

  await app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`),
  );
}
bootstrap();
