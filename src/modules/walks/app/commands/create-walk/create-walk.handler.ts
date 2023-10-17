import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateWalkCommand } from './create-walk.command';
import { WalkFactory } from 'src/modules/walks/infra/walk.factory';

@CommandHandler(CreateWalkCommand)
export class CreateWalkHandler implements ICommandHandler<CreateWalkCommand> {
  constructor(
    private readonly walkFactory: WalkFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ req }: CreateWalkCommand): Promise<void> {
    const { time, date, distance, userId } = req;
    const walk = this.eventPublisher.mergeObjectContext(
      await this.walkFactory.create(time, date, distance, userId),
    );
    walk.commit();
  }
}
