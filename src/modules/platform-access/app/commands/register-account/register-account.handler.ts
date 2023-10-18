import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAccountCommand } from './register-account.command';
import { AccountRegistrationFactory } from 'src/modules/platform-access/infra/account-registration.factory';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountHandler
  implements ICommandHandler<RegisterAccountCommand>
{
  constructor(
    private readonly accountRegistrationFactory: AccountRegistrationFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute({ req }: RegisterAccountCommand): Promise<void> {
    const { email, password } = req;
    const account = this.eventPublisher.mergeObjectContext(
      await this.accountRegistrationFactory.create(email, password),
    );
    account.commit();
  }
}
