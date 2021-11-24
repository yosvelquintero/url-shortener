import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ENTITY } from '@app/config/index';

import { UrlDocument } from '@app/modules/urls/entities/url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(ENTITY.names.urlEntity)
    private readonly urlModel: Model<UrlDocument>,
  ) {}

  public async findOneByCode(code: string): Promise<UrlDocument> {
    const url = await this.urlModel.findOneAndUpdate(
      {
        code,
      },
      {
        $inc: { hits: 1 },
      },
    );

    if (!url) {
      throw new NotFoundException();
    }

    if (url.deleted) {
      throw new HttpException(
        {
          status: HttpStatus.GONE,
          error: 'This url has been deleted',
        },
        HttpStatus.GONE,
      );
    }

    // TODO: Handle expires...

    return url;
  }
}
