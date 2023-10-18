import { Injectable } from '@nestjs/common';
import { Walk } from '../core/walk/walk.aggregate-root';
import { EntityFactory } from 'src/modules/db/entity.factory';
import { ObjectId } from 'mongodb';
import { WalkEntityRepository } from './walk-entity.repository';
import { WalkCreatedEvent } from '../core/walk/events/walk-created.event';

@Injectable()
export class WalkFactory implements EntityFactory<Walk> {
  constructor(private readonly walkEntityRepository: WalkEntityRepository) {}

  async create(
    time: number,
    date: Date,
    distance: number,
    dogOwnerId: string,
  ): Promise<Walk> {
    const walk = new Walk(
      new ObjectId().toHexString(),
      time,
      date,
      distance,
      dogOwnerId,
    );

    await this.walkEntityRepository.create(walk);
    walk.apply(new WalkCreatedEvent(walk.getId()));
    return walk;
  }
}
