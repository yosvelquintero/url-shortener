import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
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

import { RequestAuthDto } from '../auth/dto/request-auth.dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

import {
  CreateUrlDto,
  UpdateUrlDto,
  ParamsIdUrlDto,
  FindAllQueryUrlDto,
} from './dto';
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
  public async create(
    @Body() bodyData: CreateUrlDto,
    @Request() { user: { id: userId } }: RequestAuthDto,
  ): Promise<UrlEntity> {
    return await this.urlsService.create(userId, bodyData);
  }

  @Get()
  @ApiOkResponse({ type: [UrlEntity] })
  public async findAll(
    @Query() queryData: FindAllQueryUrlDto,
    @Request() { user: { id: userId } }: RequestAuthDto,
  ): Promise<UrlEntity[]> {
    return await this.urlsService.findAll(userId, queryData);
  }

  @Get(':id')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async findOne(
    @Param() paramData: ParamsIdUrlDto,
    @Request() { user: { id: userId } }: RequestAuthDto,
  ): Promise<UrlEntity> {
    return this.urlsService.findOne(userId, paramData.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Body() bodyData: UpdateUrlDto,
    @Param() paramData: ParamsIdUrlDto,
    @Request() { user: { id: userId } }: RequestAuthDto,
  ): Promise<UrlEntity> {
    return this.urlsService.update(userId, paramData.id, bodyData);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UrlEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(
    @Param() paramData: ParamsIdUrlDto,
    @Request() { user: { id: userId } }: RequestAuthDto,
  ): Promise<UrlEntity> {
    return this.urlsService.remove(userId, paramData.id);
  }
}
