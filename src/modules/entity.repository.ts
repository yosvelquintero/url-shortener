import { NotFoundException } from '@nestjs/common';
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  public async authenticateByEmail(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, AnyKeys<T>>,
  ): Promise<T | null> {
    return await this.entityModel.findOne(entityFilterQuery, projection);
  }

  public async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, AnyKeys<T>>,
  ): Promise<T | null> {
    const entity = await this.entityModel.findOne(
      entityFilterQuery,
      projection,
    );
    return this.handlingNotFoundException(entity);
  }

  public async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery);
  }

  public async create(createEntityData: AnyKeys<T> & AnyObject): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  }

  public async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<AnyKeys<T>>,
  ): Promise<T | null> {
    const entity = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      {
        ...updateEntityData,
      },
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );

    return this.handlingNotFoundException(entity);
  }

  private handlingNotFoundException<T>(entity: T): T {
    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
