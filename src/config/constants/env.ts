import { DeepReadonly } from 'ts-essentials';
import { IEnv } from '@url-shortener/types/index';

export const ENV: DeepReadonly<IEnv> = {
  app: {
    api: {
      host: 'APP_API_HOST',
      port: 'APP_API_PORT',
      prefix: 'APP_API_PREFIX',
      isProduction: 'APP_API_IS_PRODUCTION',
    },
  },
  database: {
    mongodb: {
      mongodbHost: 'MONGODB_HOST',
      mongodbDb: 'MONGODB_DB',
      mongodbUser: 'MONGODB_USER',
      mongodbPort: 'MONGODB_PORT',
      mongodbPassword: 'MONGODB_PASSWORD',
      mongodbUri: 'MONGODB_URI',
    },
  },
};
