import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyWalksQuery } from './get-daily-walks.query';
import { WalkDto } from 'src/modules/walks/dtos/walk.dto';
import { WalkDtoRepository } from 'src/modules/walks/infra/walk-dto.repository';

@QueryHandler(GetDailyWalksQuery)
export class GetDailyWalksHandler implements IQueryHandler<GetDailyWalksQuery> {
  constructor(private readonly query: WalkDtoRepository) {}

  async execute(dateString: string): Promise<WalkDto[]> {
    const date = new Date(dateString);
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
    );
    return this.query.findByDateRange(startOfDay, endOfDay);
  }
}
