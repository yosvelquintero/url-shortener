import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { IUrlCodeParameter, IUrlIdParameter } from '@app/types';

export class ParamsIdUrlDto implements IUrlIdParameter {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  readonly id: string;
}

export class ParamsCodeUrlDto implements IUrlCodeParameter {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly code: string;
}
