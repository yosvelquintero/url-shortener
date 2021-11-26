import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  Matches,
  MinDate,
  IsOptional,
  IsUrl,
} from 'class-validator';

import { IUrl } from '@app/types/index';
import { arrayToList } from '@app/utils/index';

const words = ['apple', 'google'];
const blackListRegex = new RegExp(`^((?!(${words.join('|')})).)*$`);

export class CreateUrlDto implements Partial<IUrl> {
  @IsUrl()
  @Matches(blackListRegex, {
    message: `Url should not contain any of the words: ${arrayToList(words)}`,
  })
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: `Should be a valid URL excluding black list words: ${arrayToList(
      words,
    )}`,
  })
  readonly url: string;

  @MinDate(new Date())
  @IsDate()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  readonly expires?: Date | null;
}
