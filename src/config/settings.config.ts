import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { json, urlencoded } from 'express';
import * as helmet from 'helmet';

import { ValidationErrorFilter } from '@app/filters';

export const settingsConfig = (prefix: string, app: INestApplication): void => {
  app.use(helmet());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(prefix, {
    exclude: [
      {
        path: ':code',
        method: RequestMethod.GET,
      },
      {
        path: 'urls/:code',
        method: RequestMethod.GET,
      },
    ],
  });
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
  app.useGlobalFilters(new ValidationErrorFilter());
  app.use(json({ limit: 2 * 1024 * 1024 }));
  app.use(urlencoded({ limit: 2 * 1024 * 1024, extended: true }));
};
