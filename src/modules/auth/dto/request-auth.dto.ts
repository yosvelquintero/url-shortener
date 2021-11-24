import { ApiProperty } from '@nestjs/swagger';

import { IAuthUser } from '@app/types/index';

export class RequestAuthDto {
  @ApiProperty()
  readonly user: Omit<IAuthUser, 'password'>;
}
