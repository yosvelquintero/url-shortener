import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

import { DATABASE } from '@app/config';
import { EUserRole, IUser } from '@app/types';
import { getMongooseSchemaOptions } from '@app/utils';

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

UserSchema.pre<IUser>('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.plugin(uniqueValidator);
