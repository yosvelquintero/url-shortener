import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
} from 'class-validator';

import { IUrl } from '@app/types/index';

const words = ['apple', 'google'];
const blackListRegex = new RegExp(`^((?!(${words.join('|')})).)*$`, 'gi');

export class CreateUrlDto implements Partial<IUrl> {
  @IsNotEmpty()
  @IsUrl()
  @Matches(blackListRegex, {
    message: `url should not contain any of the words: ${words.join(', ')}`,
  })
  @ApiProperty()
  readonly url: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
  })
  readonly expires?: Date | null;
}
