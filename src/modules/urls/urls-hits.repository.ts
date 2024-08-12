import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../entity.repository';

import { UrlHitDocument, UrlHitEntity } from './entities/url-hit.entity';

@Injectable()
export class UrlHitsRepository extends EntityRepository<UrlHitDocument> {
  constructor(@InjectModel(UrlHitEntity.name) urlModel: Model<UrlHitDocument>) {
    super(urlModel);
  }
}
