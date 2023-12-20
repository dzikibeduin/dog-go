import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/modules/db/entity.factory';
import { Account } from '../../core/account/account.aggregate-root';
import { ObjectId } from 'mongodb';
import { AccountLoginEntityRepository } from './account-login-entity.factory';

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
    return accountLogin;
  }
}
