import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAccountCommand } from './register-account.command';
import { AccountRegistrationFactory } from 'src/modules/platform-access/infra/registration/account-registration.factory';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountRegistrationEntityRepository } from 'src/modules/platform-access/infra/registration/account-registration-entity.repository';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountHandler
  implements ICommandHandler<RegisterAccountCommand>
{
  constructor(
    private readonly accountRegistrationFactory: AccountRegistrationFactory,
    private readonly accountRegistrationEntityRepository: AccountRegistrationEntityRepository,
  ) {}

  async execute({ req }: RegisterAccountCommand): Promise<void> {
    const { email, password } = req;

    const existingAccount =
      await this.accountRegistrationEntityRepository.findByEmail(email);

    if (existingAccount) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    await this.accountRegistrationFactory.create(email, password);
  }
}
