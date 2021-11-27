import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../entity.repository';

import { UserDocument, UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(UserEntity.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
