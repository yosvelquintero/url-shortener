import { DeepReadonly } from 'ts-essentials';

import { IDatabase } from '@app/types/index';

export const DATABASE: DeepReadonly<IDatabase> = {
  mongodb: {
    collections: {
      urls: 'urls',
      users: 'users',
    },
  },
};
