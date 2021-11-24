import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { ENV, settingsConfig, swaggerConfig } from '@app/config/index';
import { AppModule } from '@app/modules/app/app.module';
import { TEnvAppApi } from '@app/types/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const api: TEnvAppApi = {
    name: configService.get<string>(ENV.app.api.name),
    version: configService.get<string>(ENV.app.api.version),
    host: configService.get<string>(ENV.app.api.host),
    port: configService.get<string>(ENV.app.api.port),
    prefix: configService.get<string>(ENV.app.api.prefix),
    isSwaggerEnabled: configService.get<string>(ENV.app.api.isSwaggerEnabled),
    swagger: {
      description: configService.get<string>(ENV.app.api.swagger.description),
      prefix: configService.get<string>(ENV.app.api.swagger.prefix),
    },
  };
  const logger = new Logger(api.name);
  settingsConfig(api.prefix, app);
  if (api.isSwaggerEnabled) {
    swaggerConfig(app, api);
  }

  await app.listen(api.port, () => {
    const url = `${api.host}:${api.port}${api.prefix}`;
    logger.log(`Running on: ${url}`);
    logger.log(`Swagger running on: ${url}${api.swagger.prefix}`);
  });
}
bootstrap();
