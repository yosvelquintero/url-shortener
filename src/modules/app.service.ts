import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UrlDocument } from './urls/entities/url.entity';
import { UrlsRepository } from './urls/urls.repository';

@Injectable()
export class AppService {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  public async findOneByCode(code: string): Promise<UrlDocument> {
    const url = await this.urlsRepository.findOneAndUpdate(
      {
        code,
      },
      {
        $inc: { hits: 1 },
        $set: { updated: new Date() },
      },
    );

    if (url.deleted) {
      this.handleGoneException(code);
    }

    if (url.expires && new Date(url.expires) < new Date()) {
      this.handleGoneException(code, 'expired');
    }

    return url;
  }

  private handleGoneException(code: string, str = 'deleted'): void {
    throw new HttpException(
      {
        status: HttpStatus.GONE,
        error: `url with code: ${code} has been ${str}`,
      },
      HttpStatus.GONE,
    );
  }
}
