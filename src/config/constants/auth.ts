import { DeepReadonly } from 'ts-essentials';

import { IAuthGuards } from '@app/types';

export const AUTH: DeepReadonly<IAuthGuards> = {
  guards: {
    local: 'local',
    jwt: 'jwt',
  },
  saltRounds: 10,
};
