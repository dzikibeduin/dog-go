import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WalkDto } from '../dtos/walk.dto';
import { GetDailyWalksQuery } from '../app/queries/get-daily-walks/get-daily-walks.query';
import { GetMonthlyWalksQuery } from '../app/queries/get-monthly-walks/get-monthly-walks.query';
import { CreateWalkRequest } from '../dtos/create-walk-request.dto';
import { CreateWalkCommand } from '../app/commands/create-walk/create-walk.command';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('walks')
@UseGuards(AuthenticationGuard)
export class WalksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/daily')
  async getDailyWalks(): Promise<WalkDto[]> {
    return this.queryBus.execute<GetDailyWalksQuery, WalkDto[]>(
      new GetDailyWalksQuery(),
    );
  }

  @Get('/monthly')
  async getMonthlyWalks(): Promise<WalkDto[]> {
    return this.queryBus.execute<GetMonthlyWalksQuery, WalkDto[]>(
      new GetMonthlyWalksQuery(),
    );
  }

  @Post()
  async createWalk(
    @Body() createWalkRequest: CreateWalkRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateWalkCommand, void>(
      new CreateWalkCommand(createWalkRequest),
    );
  }
}
