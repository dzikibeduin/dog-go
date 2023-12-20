import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/modules/db/base-entity.repository';
import { AccountRegistration } from '../../core/account-registration/account-registration.aggregate-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountSchema } from '../account.schema';
import { AccountRegistrationSchemaFactory } from '../account-registration-schema.factory';

@Injectable()
export class AccountRegistrationEntityRepository extends BaseEntityRepository<
  AccountSchema,
  AccountRegistration
> {
  constructor(
    @InjectModel(AccountSchema.name)
    accountModel: Model<AccountSchema>,
    accountRegistrationSchemaFactory: AccountRegistrationSchemaFactory,
  ) {
    super(accountModel, accountRegistrationSchemaFactory);
  }

  async findByEmail(email: string): Promise<AccountRegistration | null> {
    try {
      const account = await this.findOne({
        email,
      });

      return account;
    } catch (error) {
      if (error.message === 'Entity not found') {
        return null;
      }

      // Rzuć ponownie, jeśli to jest inny błąd
      throw error;
    }
  }
}
