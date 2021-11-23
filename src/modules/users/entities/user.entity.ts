import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { DATABASE } from '@app/config/index';
import { EUserRole, IUser } from '@app/types/index';
import { getMongooseSchemaOptions } from '@app/utils/index';

export type UserDocument = UserEntity & Document;

@Schema(
  getMongooseSchemaOptions<Document<UserEntity>>({
    collection: DATABASE.mongodb.collections.users,
  }),
)
export class UserEntity implements IUser {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop({
    index: true,
    unique: true,
  })
  @ApiProperty({
    uniqueItems: true,
  })
  email: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop({
    type: String,
    enum: EUserRole,
  })
  @ApiProperty({
    enum: EUserRole,
  })
  role: EUserRole;

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
  deleted: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.plugin(uniqueValidator);
