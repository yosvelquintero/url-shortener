import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { DATABASE } from '@app/config';
import { IUrl } from '@app/types';
import { getMongooseSchemaOptions } from '@app/utils';

export type UrlDocument = UrlEntity & Document;

@Schema(
  getMongooseSchemaOptions<Document<UrlEntity>>({
    collection: DATABASE.mongodb.collections.urls,
  }),
)
export class UrlEntity implements IUrl {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop({
    index: true,
  })
  @ApiProperty()
  userId: string;

  @Prop({
    index: true,
  })
  @ApiProperty()
  url: string;

  @Prop({
    index: true,
    unique: true,
  })
  @ApiProperty({
    uniqueItems: true,
  })
  code: string;

  @Prop({
    default: 0,
  })
  @ApiProperty({
    default: 0,
  })
  hits: number;

  @Prop()
  @ApiProperty()
  created: Date;

  @Prop()
  @ApiProperty()
  updated: Date;

  @Prop({
    default: null,
  })
  @ApiProperty({
    default: null,
  })
  expires: Date | null;

  @Prop({
    default: null,
  })
  @ApiProperty({
    default: null,
  })
  deleted: Date | null;
}

export const UrlSchema = SchemaFactory.createForClass(UrlEntity);

UrlSchema.plugin(uniqueValidator);
