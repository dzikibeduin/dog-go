import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../core/account/account.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../../core/account/account.aggregate-root';
import { AccountSchema } from '../account.schema';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    @InjectModel(AccountSchema.name)
    private readonly accountModel: Model<AccountSchema>,
  ) {}

  public async findByEmail(email: string): Promise<Account | null> {
    const account = await this.accountModel.findOne({ email });

    return account
      ? new Account(account.id, account.email, account.password)
      : null;
  }
}
