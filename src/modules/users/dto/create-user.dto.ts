import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsIn } from 'class-validator';

import { EUserRole, IUser } from '@app/types/index';

export class CreateUserDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsIn([...Object.values(EUserRole)])
  @ApiProperty({
    type: String,
    description: `Should be one of the following values: ${Object.values(
      EUserRole,
    ).join(', ')}`,
  })
  readonly role: EUserRole;
}
