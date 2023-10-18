import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/modules/db/entity.factory';
import { ObjectId } from 'mongodb';
import { AccountRegistration } from '../core/account-registration/account-registration.aggregate-root';
import { AccountRegistrationEntityRepository } from './account-registration-entity.repository';
import { AccountRegisteredEvent } from '../core/account-registration/events/account-registered.event';

@Injectable()
export class AccountRegistrationFactory
  implements EntityFactory<AccountRegistration>
{
  constructor(
    private readonly accountRegistrationEntityRepository: AccountRegistrationEntityRepository,
  ) {}

  async create(email: string, password: string): Promise<AccountRegistration> {
    const accountRegistration = new AccountRegistration(
      new ObjectId().toHexString(),
      email,
      password,
    );

    await this.accountRegistrationEntityRepository.create(accountRegistration);
    accountRegistration.apply(
      new AccountRegisteredEvent(accountRegistration.getId()),
    );
    return accountRegistration;
  }
}
