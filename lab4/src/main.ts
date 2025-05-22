import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(process.cwd(), 'public');
  console.log('Serving static files from:', publicPath);
  app.useStaticAssets(publicPath);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();