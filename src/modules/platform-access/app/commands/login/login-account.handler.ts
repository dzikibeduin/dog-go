import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginAccountCommand } from './login-account.command';
import { JwtService } from '@nestjs/jwt';
import { HttpException, Inject } from '@nestjs/common';
import { AccountRepository } from 'src/modules/platform-access/core/account/account.repository';

@CommandHandler(LoginAccountCommand)
export class LoginAccountHandler
  implements ICommandHandler<LoginAccountCommand>
{
  constructor(
    @Inject('accountRepository')
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ req }: LoginAccountCommand) {
    const { email, password } = req;
    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new HttpException('Account not found', 401);
    }

    await account.login(password);

    const accessToken = this.jwtService.sign({
      email: account.getEmail(),
    });

    return accessToken;
  }
}
