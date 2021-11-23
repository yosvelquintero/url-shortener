import { DeepReadonly } from 'ts-essentials';

import { IAuthGuards } from '@app/types/index';

export const AUTH: DeepReadonly<IAuthGuards> = {
  guards: {
    local: 'local',
    jwt: 'jwt',
  },
};
