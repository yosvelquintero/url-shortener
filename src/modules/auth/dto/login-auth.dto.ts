import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

import { IAuthUser } from '@app/types';

export class LoginAuthDto implements Omit<IAuthUser, 'id' | 'role'> {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
}
