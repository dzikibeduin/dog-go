import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';
import { EntityRepository } from './entity.repository';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity | null> {
    return this.findOne({
      _id: new ObjectId(id),
    } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndReplace(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }

  async findByEmail(email: string): Promise<TEntity | null> {
    try {
      return await this.findOne({ email } as FilterQuery<TSchema>);
    } catch (error) {
      if (error.message === 'Entity not found') {
        return null;
      }
      throw error;
    }
  }
}
