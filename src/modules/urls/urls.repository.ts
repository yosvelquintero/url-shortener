import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../entity.repository';

import { UrlDocument, UrlEntity } from './entities/url.entity';

@Injectable()
export class UrlsRepository extends EntityRepository<UrlDocument> {
  constructor(@InjectModel(UrlEntity.name) urlModel: Model<UrlDocument>) {
    super(urlModel);
  }
}
