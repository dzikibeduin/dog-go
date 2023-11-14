import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LoginAccountCommand } from './login-account.command';
import { JwtService } from '@nestjs/jwt';
import { AccountRepositoryImpl } from 'src/modules/platform-access/infra/login/account.repository';

@CommandHandler(LoginAccountCommand)
export class LoginAccountHandler
  implements ICommandHandler<LoginAccountCommand>
{
  constructor(
    private readonly accountRepository: AccountRepositoryImpl,
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
