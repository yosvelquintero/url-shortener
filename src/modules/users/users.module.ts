import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ENTITY } from '@app/config/index';

import { UserSchema } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ENTITY.names.userEntity, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
