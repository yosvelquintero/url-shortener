import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { DATABASE } from '@app/config';
import { IUrlHit } from '@app/types';
import { getMongooseSchemaOptions } from '@app/utils';

export type UrlHitDocument = UrlHitEntity & Document;

@Schema(
  getMongooseSchemaOptions<Document<UrlHitEntity>>({
    collection: DATABASE.mongodb.collections.urlHits,
  }),
)
export class UrlHitEntity implements IUrlHit {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  total: number;
}

export const UrlHitSchema = SchemaFactory.createForClass(UrlHitEntity);

UrlHitSchema.plugin(uniqueValidator);
