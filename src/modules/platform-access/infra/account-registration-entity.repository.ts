import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/modules/db/base-entity.repository';
import { AccountRegistration } from '../core/account-registration/account-registration.aggregate-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountSchema } from './account.schema';
import { AccountSchemaFactory } from './account-schema.factory';

@Injectable()
export class AccountRegistrationEntityRepository extends BaseEntityRepository<
  AccountSchema,
  AccountRegistration
> {
  constructor(
    @InjectModel(AccountSchema.name)
    accountModel: Model<AccountSchema>,
    accountRegistrationSchemaFactory: AccountSchemaFactory,
  ) {
    super(accountModel, accountRegistrationSchemaFactory);
  }
}
