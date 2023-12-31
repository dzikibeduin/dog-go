import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/modules/db/entity-schema.factory';
import { AccountSchema } from './account.schema';
import { ObjectId } from 'mongodb';
import { AccountRegistration } from '../core/account-registration/account-registration.aggregate-root';

@Injectable()
export class AccountRegistrationSchemaFactory
  implements EntitySchemaFactory<AccountSchema, AccountRegistration>
{
  create(account: AccountRegistration): AccountSchema {
    return {
      _id: new ObjectId(account.getId()),
      email: account.getEmail(),
      password: account.getPassword(),
    };
  }

  createFromSchema(entitySchema: AccountSchema): AccountRegistration {
    return new AccountRegistration(
      entitySchema._id.toHexString(),
      entitySchema.email,
      entitySchema.password,
    );
  }
}
