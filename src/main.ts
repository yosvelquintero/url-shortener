import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from '@url-shortener/modules/app.module';
import {
  ENV,
  securityConfig,
  swaggerConfig,
} from '@url-shortener/config/index';
import { TEnvAppApi } from '@url-shortener/types/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const api: TEnvAppApi = {
    name: configService.get<string>(ENV.app.api.name),
    version: configService.get<string>(ENV.app.api.version),
    host: configService.get<string>(ENV.app.api.host),
    port: configService.get<string>(ENV.app.api.port),
    prefix: configService.get<string>(ENV.app.api.prefix),
    isProduction: configService.get<string>(ENV.app.api.isProduction),
    swagger: {
      description: configService.get<string>(ENV.app.api.swagger.description),
      prefix: configService.get<string>(ENV.app.api.swagger.prefix),
    },
  };
  const logger = new Logger(api.name);
  securityConfig(api.prefix, app);
  swaggerConfig(app, api);

  await app.listen(api.port, () => {
    const url = `${api.host}:${api.port}${api.prefix}`;
    logger.log(`Running on: ${url}`);
    logger.log(`Swagger running on: ${url}${api.swagger}`);
  });
}
bootstrap();
