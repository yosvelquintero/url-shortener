import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsIn } from 'class-validator';

import { EUserRole, IUser } from '@app/types/index';
import { arrayToList } from '@app/utils/index';

export class CreateUserDto implements Partial<IUser> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly password: string;

  @IsIn([...Object.values(EUserRole)])
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: `Should be one of the following values: ${arrayToList(
      Object.values(EUserRole),
    )}`,
    required: true,
  })
  readonly role: EUserRole;
}
