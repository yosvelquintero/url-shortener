import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UrlDocument } from './urls/entities/url.entity';
import { UrlHitDocument } from './urls/entities/url-hit.entity';
import { UrlsRepository } from './urls/urls.repository';
import { UrlHitsRepository } from './urls/urls-hits.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly urlsRepository: UrlsRepository,
    private readonly urlHitsRepository: UrlHitsRepository,
  ) {}

  public async findOneByCode(code: string): Promise<UrlDocument> {
    const url = await this.urlsRepository.findOne(
      { code },
      {},
      {
        populate: [
          {
            path: 'hits',
            select: ['total'],
          },
        ],
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

  public async findOneUrlHitAndUpdate(id: string): Promise<UrlHitDocument> {
    return await this.urlHitsRepository.findOneAndUpdate(
      { _id: id },
      {
        $inc: { total: 1 },
        $set: { updated: new Date() },
      },
    );
  }

  private handleGoneException(code: string, str = 'deleted'): void {
    throw new HttpException(
      {
        status: HttpStatus.GONE,
        error: `Url with code: ${code} has been ${str}`,
      },
      HttpStatus.GONE,
    );
  }
}
