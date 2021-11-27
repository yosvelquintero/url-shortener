import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TEnvAppApi } from '@app/types';

import { AUTH } from './constants/auth';

export const swaggerConfig = (app: INestApplication, api: TEnvAppApi): void => {
  const config = new DocumentBuilder()
    .setTitle(api.name)
    .setDescription(api.swagger.description)
    .setVersion(api.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      AUTH.guards.jwt,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${api.prefix}${api.swagger.prefix}`, app, document);
};
