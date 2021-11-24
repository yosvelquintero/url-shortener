import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

import { ENTITY } from '@app/config/index';

import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
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

  public async findAll(userId: string): Promise<UrlDocument[]> {
    return await this.urlModel.find({ userId, deleted: { $eq: null } });
  }

  public async findOne(userId: string, id: string): Promise<UrlDocument> {
    const url = await this.urlModel.findOne({
      _id: id,
      userId,
      deleted: { $eq: null },
    });

    if (!url) {
      throw new NotFoundException();
    }

    return url;
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
          code: nanoid(10),
          updated: new Date(),
        },
      },
      {
        new: true,
      },
    );

    if (!url) {
      throw new NotFoundException();
    }

    return url;
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
        context: 'query',
      },
    );

    if (!url) {
      throw new NotFoundException();
    }

    return url;
  }
}
