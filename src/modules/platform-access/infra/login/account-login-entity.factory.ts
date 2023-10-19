import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/modules/db/base-entity.repository';
import { AccountSchema } from '../account.schema';
import { Account } from '../../core/account/account.aggregate-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountSchemaFactory } from '../account-schema.factory';

@Injectable()
export class AccountLoginEntityRepository extends BaseEntityRepository<
  AccountSchema,
  Account
> {
  constructor() {
    @InjectModel(AccountSchema.name)
    accountModel: Model<AccountSchema>,
    accountSchemaFactory: AccountSchemaFactory,
  ) {
    super(accountModel, accountSchemaFactory);
  }
} //todo
