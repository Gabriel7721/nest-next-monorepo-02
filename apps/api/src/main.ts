import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const webUrl = process.env.WEB_URL;
  const port = process.env.PORT as string;

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
    console.log(`Backend:http://localhost:${port}`),
  );
}
bootstrap();
