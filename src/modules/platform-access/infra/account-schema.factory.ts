import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/modules/db/entity-schema.factory';
import { AccountSchema } from './account.schema';
import { ObjectId } from 'mongodb';
import { Account } from '../core/account/account.aggregate-root';

@Injectable()
export class AccountSchemaFactory
  implements EntitySchemaFactory<AccountSchema, Account>
{
  create(account: Account): AccountSchema {
    return {
      _id: new ObjectId(account.getId()),
      email: account.getEmail(),
      password: account.getPassword(),
    };
  }

  createFromSchema(entitySchema: AccountSchema): Account {
    return new Account(
      entitySchema._id.toHexString(),
      entitySchema.email,
      entitySchema.password,
    );
  }
}
