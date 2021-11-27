import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.usersRepository.create(createUserDto);
  }

  public async findAll(): Promise<UserDocument[]> {
    return await this.usersRepository.find({ deleted: { $eq: null } });
  }

  public async findOne(id: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({
      _id: id,
      deleted: { $eq: null },
    });
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersRepository.findOneAndUpdate(
      {
        _id: id,
        deleted: { $eq: null },
      },
      {
        $set: {
          ...updateUserDto,
        },
      },
    );
  }

  public async remove(id: string): Promise<UserDocument> {
    return await this.usersRepository.findOneAndUpdate(
      {
        _id: id,
        deleted: { $eq: null },
      },
      { $set: { deleted: new Date() } },
    );
  }
}
