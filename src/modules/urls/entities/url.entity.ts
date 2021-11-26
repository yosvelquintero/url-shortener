import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { DATABASE } from '@app/config/index';
import { IUrl } from '@app/types/index';
import { getMongooseSchemaOptions } from '@app/utils/index';

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

  @Prop()
  @ApiProperty()
  userId: string;

  @Prop()
  @ApiProperty()
  url: string;

  @Prop()
  @ApiProperty()
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

export const UrlSchema = SchemaFactory.createForClass(UrlEntity).index({
  userId: 1,
  code: 1,
});

UrlSchema.plugin(uniqueValidator);
