import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/modules/db/entity-schema.factory';
import { WalkSchema } from './walk.schema';
import { Walk } from '../core/walk/walk.aggregate-root';
import { ObjectId } from 'mongodb';

@Injectable()
export class WalkSchemaFactory
  implements EntitySchemaFactory<WalkSchema, Walk>
{
  create(walk: Walk): WalkSchema {
    return {
      _id: new ObjectId(walk.getId()),
      time: walk.getTime(),
      date: walk.getDate(),
      distance: walk.getDistance(),
      dogOwnerId: walk.getUserId(),
    };
  }

  createFromSchema(entitySchema: WalkSchema): Walk {
    return new Walk(
      entitySchema._id.toHexString(),
      entitySchema.time,
      entitySchema.date,
      entitySchema.distance,
      entitySchema.dogOwnerId,
    );
  }
}
