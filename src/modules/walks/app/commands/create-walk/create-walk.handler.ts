import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWalkCommand } from './create-walk.command';
import { WalkFactory } from 'src/modules/walks/infra/walk.factory';

@CommandHandler(CreateWalkCommand)
export class CreateWalkHandler implements ICommandHandler<CreateWalkCommand> {
  constructor(private readonly walkFactory: WalkFactory) {}

  async execute({ req }: CreateWalkCommand): Promise<void> {
    const { time, date, distance, dogOwnerId } = req;
    await this.walkFactory.create(time, date, distance, dogOwnerId);
  }
}
