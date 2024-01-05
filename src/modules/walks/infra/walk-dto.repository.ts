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
    return await this.walkModel.find({}, {}, { lean: true });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<WalkDto[]> {
    return await this.walkModel.find(
      {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      {},
      { lean: true },
    );
  }
}
