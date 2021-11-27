import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UrlEntity, UrlSchema } from './entities/url.entity';
import { UrlsRepository } from './urls.repository';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UrlEntity.name, schema: UrlSchema }]),
  ],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsRepository],
  exports: [UrlsService, UrlsRepository],
})
export class UrlsModule {}
