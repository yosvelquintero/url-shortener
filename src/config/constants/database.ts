import { DeepReadonly } from 'ts-essentials';

import { IDatabase } from '@app/types';

export const DATABASE: DeepReadonly<IDatabase> = {
  mongodb: {
    collections: {
      urls: 'urls',
      urlHits: 'urlHits',
      users: 'users',
    },
  },
};
