import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TEnvAppApi } from '@url-shortener/types/index';

export const swaggerConfig = (app: INestApplication, api: TEnvAppApi): void => {
  const config = new DocumentBuilder()
    .setTitle(api.name)
    .setDescription(api.swagger.description)
    .setVersion(api.version)
    .build();

  SwaggerModule.setup(
    `${api.prefix}${api.swagger.prefix}`,
    app,
    SwaggerModule.createDocument(app, config),
  );
};
