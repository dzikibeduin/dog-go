import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAccountCommand } from './register-account.command';
import { AccountRegistrationFactory } from 'src/modules/platform-access/infra/registration/account-registration.factory';

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

    await this.accountRegistrationFactory.create(email, password);
  } // todo check if email already exists
}
