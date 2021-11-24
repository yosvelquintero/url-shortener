import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UrlsService } from '../urls/urls.service';
import { ParamsCodeUrlDto } from '../urls/dto';
import { UrlEntity } from '../urls/entities/url.entity';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get(':code')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async findOneByCode(
    @Param() paramData: ParamsCodeUrlDto,
  ): Promise<UrlEntity> {
    return this.urlsService.findOneByCode(paramData.code);
  }
}
