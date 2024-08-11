import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UrlEntity, UrlSchema } from './entities/url.entity';
import { UrlHitEntity, UrlHitSchema } from './entities/url-hit.entity';
import { UrlsRepository } from './urls.repository';
import { UrlHitsRepository } from './urls-hits.repository';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UrlEntity.name, schema: UrlSchema }]),
    MongooseModule.forFeature([
      { name: UrlHitEntity.name, schema: UrlHitSchema },
    ]),
  ],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsRepository, UrlHitsRepository],
  exports: [UrlsService, UrlsRepository, UrlHitsRepository],
})
export class UrlsModule {}
