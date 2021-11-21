import { DeepReadonly } from 'ts-essentials';
import { IAuth } from '@url-shortener/types/index';

export const AUTH: DeepReadonly<IAuth> = {
  guards: {
    anonymous: 'anonymous',
    local: 'local',
    jwt: 'jwt',
  },
};
