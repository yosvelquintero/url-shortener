import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

import { IUrlIdParameter } from '@app/types';

export class ParamsIdUserDto implements IUrlIdParameter {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  readonly id: string;
}
