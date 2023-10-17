import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyWalksQuery } from './get-daily-walks.query';
import { WalkDto } from 'src/modules/walks/dtos/walk.dto';
import { WalkDtoRepository } from 'src/modules/walks/infra/walk-dto.repository';

@QueryHandler(GetDailyWalksQuery)
export class GetDailyWalksHandler implements IQueryHandler<GetDailyWalksQuery> {
  constructor(private readonly query: WalkDtoRepository) {}

  async execute(): Promise<WalkDto[]> {
    return this.query.findAll();
  }
}
