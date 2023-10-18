import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountRegisteredEvent } from './account-registered.event';

@EventsHandler()
export class AccountRegisteredHandler
  implements IEventHandler<AccountRegisteredEvent>
{
  async handle({ accountId }: AccountRegisteredEvent): Promise<void> {
    console.log(`Account with id ${accountId} was registered`);
  }
}
