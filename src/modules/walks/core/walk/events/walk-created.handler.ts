import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WalkCreatedEvent } from './walk-created.event';

@EventsHandler(WalkCreatedEvent)
export class WalkCreatedHandler implements IEventHandler<WalkCreatedEvent> {
  async handle({ walkId }: WalkCreatedEvent): Promise<void> {
    console.log(`Walk with id ${walkId} was created`);
  }
}
