import { NotFoundException } from '@nestjs/common';
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  public async authenticateByEmail(
    filter: FilterQuery<T>,
    projection?: Record<string, AnyKeys<T>>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return await this.entityModel.findOne(filter, projection, options);
  }

  public async findOne(
    filter: FilterQuery<T>,
    projection?: Record<string, AnyKeys<T>>,
    options?: QueryOptions,
  ): Promise<T | null> {
    const entity = await this.entityModel.findOne(filter, projection, options);
    return this.handlingNotFoundException(entity);
  }

  public async find(
    filter: FilterQuery<T>,
    projection?: Record<string, AnyKeys<T>>,
    options?: QueryOptions,
  ): Promise<T[] | null> {
    return await this.entityModel.find(filter, projection, options);
  }

  public async create(createEntityData: AnyKeys<T> & AnyObject): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  }

  public async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<AnyKeys<T>>,
    options?: QueryOptions,
  ): Promise<T | null> {
    const entity = await this.entityModel.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
      context: 'query',
      ...options,
    });

    return this.handlingNotFoundException(entity);
  }

  public async findOneAndDelete(
    filter: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    const entity = await this.entityModel.findOneAndDelete(filter, options);
    return this.handlingNotFoundException(entity);
  }

  private handlingNotFoundException<T>(entity: T): T {
    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
