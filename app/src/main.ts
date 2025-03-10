import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/guard/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ //globalni pipe za validaciju
    whitelist: true, //striktno elementi koji su u dto
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
