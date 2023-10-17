import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WalkDto } from '../dtos/walk.dto';
import { GetDailyWalksQuery } from '../app/queries/get-daily-walks/get-daily-walks.query';
import { CreateWalkRequest } from '../dtos/create-walk-request.dto';
import { CreateWalkCommand } from '../app/commands/create-walk/create-walk.command';

@Controller('walks')
export class WalksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getDailyWalks(): Promise<WalkDto[]> {
    return this.queryBus.execute<GetDailyWalksQuery, WalkDto[]>(
      new GetDailyWalksQuery(),
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
