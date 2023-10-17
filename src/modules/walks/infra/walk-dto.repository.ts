import { Injectable } from '@nestjs/common';
import { WalkDto } from '../dtos/walk.dto';
import { WalkSchema } from './walk.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WalkDtoRepository {
  constructor(
    @InjectModel(WalkSchema.name)
    private readonly walkModel: Model<WalkSchema>,
  ) {}

  async findAll(): Promise<WalkDto[]> {
    const walks = await this.walkModel.find().exec();
    return walks.map((walk) => ({
      id: walk.id,
      time: walk.time,
      date: walk.date,
      distance: walk.distance,
      userId: walk.userId,
    }));
  }
}
