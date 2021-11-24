import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ENTITY } from '@app/config/index';

import { UrlSchema } from './entities/url.entity';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ENTITY.names.urlEntity, schema: UrlSchema },
    ]),
  ],
  controllers: [UrlsController],
  providers: [UrlsService],
  exports: [UrlsService],
})
export class UrlsModule {}
