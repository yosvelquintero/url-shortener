import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { json, urlencoded } from 'express';
import * as helmet from 'helmet';

export const securityConfig = (prefix: string, app: INestApplication): void => {
  app.use(helmet());
  app.setGlobalPrefix(prefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );
  app.use(json({ limit: 2 * 1024 * 1024 }));
  app.use(urlencoded({ limit: 2 * 1024 * 1024, extended: true }));
};
