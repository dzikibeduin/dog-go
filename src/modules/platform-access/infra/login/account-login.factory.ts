import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/modules/db/entity.factory';
import { Account } from '../../core/account/account.aggregate-root';
import { ObjectId } from 'mongodb';
import { AccountLoginEntityRepository } from './account-login-entity.factory';
import { AccountLoggedInEvent } from '../../core/account/events/accout-logged-in.event';

@Injectable()
export class AccountLoginFactory implements EntityFactory<Account> {
  constructor(
    private readonly accountLoginEntityRepository: AccountLoginEntityRepository,
  ) {}

  async create(email: string, password: string): Promise<Account> {
    const accountLogin = new Account(
      new ObjectId().toHexString(),
      email,
      password,
    );

    await this.accountLoginEntityRepository.create(accountLogin);

    accountLogin.apply(new AccountLoggedInEvent(accountLogin.getId()));
    return accountLogin;
  }
}
