import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from '@url-shortener/modules/app.module';
import { ENV } from '@url-shortener/config/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env = {
    host: configService.get(ENV.app.api.host),
    port: configService.get(ENV.app.api.port),
    prefix: configService.get(ENV.app.api.prefix),
  };
  const logger = new Logger('URL Shortener: API');

  await app.listen(env.port, () => {
    const url = `${env.host}:${env.port}${env.prefix}`;
    logger.log(`Running on: ${url}`);
  });
}
bootstrap();
