import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountLoggedInEvent } from './accout-logged-in.event';

@EventsHandler()
export class AccountLoggedInHandler
  implements IEventHandler<AccountLoggedInEvent>
{
  async handle({ accountId }: AccountLoggedInEvent): Promise<void> {
    console.log(`Account with id ${accountId} was looged in`);
  }
}
