import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { nanoid } from 'nanoid';

import { ENTITY } from '@app/config/index';
import { handlingNotFoundException } from '@app/utils/index';

import { CreateUrlDto, FindAllQueryUrlDto, UpdateUrlDto } from './dto';
import { UrlDocument } from './entities/url.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(ENTITY.names.urlEntity)
    private readonly urlModel: Model<UrlDocument>,
  ) {}

  public async create(
    userId: string,
    createUrlDto: CreateUrlDto,
  ): Promise<UrlDocument> {
    return new this.urlModel({
      ...createUrlDto,
      userId,
      code: nanoid(10),
    }).save();
  }

  public async findAll(
    userId: string,
    queryData: FindAllQueryUrlDto,
  ): Promise<UrlDocument[]> {
    const { code, keyword } = queryData;
    return await this.urlModel.find({
      userId,
      ...this.getFindAllQuery(code, keyword),
      deleted: { $eq: null },
    });
  }

  public async findOne(userId: string, id: string): Promise<UrlDocument> {
    const url = await this.urlModel.findOne({
      _id: id,
      userId,
      deleted: { $eq: null },
    });

    return handlingNotFoundException<UrlDocument>(url);
  }

  public async update(
    userId: string,
    id: string,
    updateUrlDto: UpdateUrlDto,
  ): Promise<UrlDocument> {
    const url = await this.urlModel.findOneAndUpdate(
      {
        _id: id,
        userId,
        deleted: { $eq: null },
      },
      {
        $set: {
          ...updateUrlDto,
          userId,
          updated: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return handlingNotFoundException<UrlDocument>(url);
  }

  public async remove(userId: string, id: string): Promise<UrlDocument> {
    const url = await this.urlModel.findOneAndUpdate(
      {
        _id: id,
        userId,
        deleted: { $eq: null },
      },
      { $set: { deleted: new Date() } },
      {
        new: true,
        runValidators: true,
      },
    );

    return handlingNotFoundException<UrlDocument>(url);
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
