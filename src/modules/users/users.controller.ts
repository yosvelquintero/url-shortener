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

import { AUTH } from '@app/config';
import { Roles } from '@app/modules/auth/decorators';
import { EUserRole } from '@app/types';

import { JwtAuthGuard, RolesGuard } from '../auth/guards';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, ParamsIdUserDto } from './dto';

@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles({
  roles: [EUserRole.ADMIN],
})
@ApiTags('Users')
@ApiBearerAuth(AUTH.guards.jwt)
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@ApiResponse({
  status: 403,
  description: 'Forbidden resource',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  public async create(@Body() bodyData: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(bodyData);
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  public async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async findOne(
    @Param() paramData: ParamsIdUserDto,
  ): Promise<UserEntity> {
    return this.usersService.findOne(paramData.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Body() bodyData: UpdateUserDto,
    @Param() paramData: ParamsIdUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(paramData.id, bodyData);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param() paramData: ParamsIdUserDto): Promise<UserEntity> {
    return this.usersService.remove(paramData.id);
  }
}
