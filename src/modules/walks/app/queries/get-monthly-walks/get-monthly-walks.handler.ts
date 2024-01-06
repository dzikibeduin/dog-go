import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMonthlyWalksQuery } from './get-monthly-walks.query';
import { WalkDto } from 'src/modules/walks/dtos/walk.dto';
import { WalkDtoRepository } from 'src/modules/walks/infra/walk-dto.repository';

@QueryHandler(GetMonthlyWalksQuery)
export class GetMonthlyWalksHandler
  implements IQueryHandler<GetMonthlyWalksQuery>
{
  constructor(private readonly query: WalkDtoRepository) {}

  async execute(dateString: string): Promise<WalkDto[]> {
    const date = new Date(dateString);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.query.findByDateRange(firstDayOfMonth, lastDayOfMonth);
  }
}
