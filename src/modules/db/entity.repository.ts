import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { FilterQuery, Model } from 'mongoose';
import { EntitySchemaFactory } from './entity-schema.factory';
import { NotFoundException } from '@nestjs/common';

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  protected async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDoc = await this.entityModel.findOne(entityFilterQuery, {});
    if (!entityDoc) {
      throw new NotFoundException('Entity not found');
    }

    return this.entitySchemaFactory.createFromSchema(entityDoc);
  }

  protected async find(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity[]> {
    return (await this.entityModel.find(entityFilterQuery, {})).map(
      (entityDoc) => this.entitySchemaFactory.createFromSchema(entityDoc),
    );
  }

  async create(entity: TEntity): Promise<void> {
    await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
  }

  async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedEntityDoc = await this.entityModel.findOneAndReplace(
      entityFilterQuery,
      this.entitySchemaFactory.create(entity) as unknown as Document,
      { new: true, useFindAndModify: false, lean: true },
    );
    if (!updatedEntityDoc) {
      throw new NotFoundException('Entity not found');
    }
  }
}
