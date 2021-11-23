import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ENTITY } from '@app/config/index';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ENTITY.names.userEntity)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return new this.userModel(createUserDto).save();
  }

  public async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find({ deleted: { $eq: null } });
  }

  public async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      _id: id,
      deleted: { $eq: null },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      {
        _id: id,
        deleted: { $eq: null },
      },
      {
        $set: {
          ...updateUserDto,
          updated: new Date(),
        },
      },
      {
        new: true,
      },
    );

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async remove(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      {
        _id: id,
        deleted: { $eq: null },
      },
      { $set: { deleted: new Date() } },
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
