import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AUTH } from '@app/config/index';
import { EUserRole } from '@app/types/index';

import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

import { CreateUrlDto, UpdateUrlDto, ParamsIdUrlDto } from './dto';
import { UrlsService } from './urls.service';
import { UrlEntity } from './entities/url.entity';

@Controller({
  path: 'urls',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles({
  roles: [EUserRole.ADMIN, EUserRole.CLIENT],
})
@ApiTags('Urls')
@ApiBearerAuth(AUTH.guards.jwt)
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@ApiResponse({
  status: 403,
  description: 'Forbidden resource',
})
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  @ApiCreatedResponse({ type: UrlEntity })
  public async create(@Body() createUrlDto: CreateUrlDto): Promise<UrlEntity> {
    // TODO: extract user from request
    const userId = '619cba68df45478e2616728f';
    return await this.urlsService.create(userId, createUrlDto);
  }

  @Get()
  @ApiOkResponse({ type: [UrlEntity] })
  public async findAll(): Promise<UrlEntity[]> {
    return await this.urlsService.findAll();
  }

  @Get('urls/:id')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async findOne(@Param() paramData: ParamsIdUrlDto): Promise<UrlEntity> {
    return this.urlsService.findOne(paramData.id);
  }

  @Patch('urls/:id')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param() paramData: ParamsIdUrlDto,
    @Body() updateUrlDto: UpdateUrlDto,
  ): Promise<UrlEntity> {
    // TODO: extract user from request
    const userId = '619cba5cdf45478e26167288';
    return this.urlsService.update(paramData.id, userId, updateUrlDto);
  }

  @Delete('urls/:id')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param() paramData: ParamsIdUrlDto): Promise<UrlEntity> {
    return this.urlsService.remove(paramData.id);
  }
}
