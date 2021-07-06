import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';
import ValidationExceptionFactory from './providers/exception/ValidationExceptionFactory';
import { ErrorResponseFilter } from './providers/interceptors/ErrorResponseFilter';
import { OkResponseInterceptor } from './providers/interceptors/OkResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: ValidationExceptionFactory
  }))
  app.useGlobalFilters(new ErrorResponseFilter())
  app.useGlobalInterceptors(new OkResponseInterceptor())
  app.enableCors()
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
