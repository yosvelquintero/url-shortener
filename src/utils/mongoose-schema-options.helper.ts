import { SchemaOptions } from '@nestjs/mongoose';

import {
  IGetMongooseSchemaOptionsParams,
  IMongooseSchemaOptionsRet,
} from '@app/types';

export function getMongooseSchemaOptions<T>(
  params: IGetMongooseSchemaOptionsParams,
): SchemaOptions {
  return {
    collection: params.collection,
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
    toJSON: {
      transform: (_: T, ret: IMongooseSchemaOptionsRet) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  };
}
