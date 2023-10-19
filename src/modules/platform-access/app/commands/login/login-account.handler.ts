import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LoginAccountCommand } from './login-account.command';
import { AccountRepository } from 'src/modules/platform-access/core/account/account.repository';
import { JwtService } from '@nestjs/jwt';

export class LoginAccountHandler
  implements ICommandHandler<LoginAccountCommand>
{
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ req }: LoginAccountCommand) {
    const { email, password } = req;
    const account = this.eventPublisher.mergeObjectContext(
      await this.accountRepository.findByEmail(email),
    );

    await account.login(password);
    account.commit();

    const accessToken = this.jwtService.sign({
      email: account.getEmail(),
    });

    return accessToken;
  }
}
