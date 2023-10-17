import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/modules/db/base-entity.repository';
import { WalkSchema } from './walk.schema';
import { Walk } from '../core/walk/walk.aggregate-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalkSchemaFactory } from './walk-schema.factory';

@Injectable()
export class WalkEntityRepository extends BaseEntityRepository<
  WalkSchema,
  Walk
> {
  constructor(
    @InjectModel(WalkSchema.name)
    walkModel: Model<WalkSchema>,
    walkSchemaFactory: WalkSchemaFactory,
  ) {
    super(walkModel, walkSchemaFactory);
  }
}
