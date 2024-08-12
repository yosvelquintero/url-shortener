import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ParamsCodeUrlDto } from './urls/dto';
import { UrlEntity } from './urls/entities/url.entity';

import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Redirect('', 302)
  public async findOneByCode(@Param() paramData: ParamsCodeUrlDto) {
    const { url, urlHitId } = await this.appService.findOneByCode(
      paramData.code,
    );
    this.appService.findOneUrlHitAndUpdate(urlHitId);
    return {
      url,
    };
  }
}
