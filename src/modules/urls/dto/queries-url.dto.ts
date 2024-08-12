import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IQueryUrl } from '@app/types';

export class FindAllQueryUrlDto implements IQueryUrl {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly code?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly keyword?: string;
}
