import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyWalksQuery } from './get-daily-walks.query';

@QueryHandler(GetDailyWalksQuery)
export class GetDailyWalksHandler implements IQueryHandler<GetDailyWalksQuery> {
  async execute(query: GetDailyWalksQuery) {
    // todo
  }
}
