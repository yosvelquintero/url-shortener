import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { nanoid } from 'nanoid';

import { UrlDocument } from './entities/url.entity';
import { UrlsRepository } from './urls.repository';
import { CreateUrlDto, FindAllQueryUrlDto, UpdateUrlDto } from './dto';

@Injectable()
export class UrlsService {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  public async create(
    userId: string,
    createUrlDto: CreateUrlDto,
  ): Promise<UrlDocument> {
    return await this.urlsRepository.create({
      ...createUrlDto,
      userId,
      code: nanoid(10),
    });
  }

  public async findAll(
    userId: string,
    queryData: FindAllQueryUrlDto,
  ): Promise<UrlDocument[]> {
    const { code, keyword } = queryData;
    return await this.urlsRepository.find({
      userId,
      ...this.getFindAllQuery(code, keyword),
      deleted: { $eq: null },
    });
  }

  public async findOne(userId: string, id: string): Promise<UrlDocument> {
    return await this.urlsRepository.findOne({
      _id: id,
      userId,
      deleted: { $eq: null },
    });
  }

  public async update(
    userId: string,
    id: string,
    updateUrlDto: UpdateUrlDto,
  ): Promise<UrlDocument> {
    return await this.urlsRepository.findOneAndUpdate(
      {
        _id: id,
        userId,
        deleted: { $eq: null },
      },
      {
        $set: {
          ...updateUrlDto,
          updated: new Date(),
        },
      },
    );
  }

  public async remove(userId: string, id: string): Promise<UrlDocument> {
    return await this.urlsRepository.findOneAndUpdate(
      {
        _id: id,
        userId,
        deleted: { $eq: null },
      },
      {
        $set: {
          deleted: new Date(),
        },
      },
    );
  }

  private getFindAllQuery(code = '', keyword = ''): FilterQuery<UrlDocument> {
    return {
      $and: [
        {
          code: {
            $regex: code,
            $options: 'i',
          },
        },
        {
          url: {
            $regex: keyword,
            $options: 'i',
          },
        },
      ],
    };
  }
}
