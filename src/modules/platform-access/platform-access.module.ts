import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PlatformAccessController } from './api/platform-access.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AccountSchema } from './infra/account.schema';
import { AccountSchemaFactory } from './infra/account-schema.factory';
import { AccountRegistrationEntityRepository } from './infra/registration/account-registration-entity.repository';
import { AccountRegistrationFactory } from './infra/registration/account-registration.factory';
import { RegisterAccountHandler } from './app/commands/register-account/register-account.handler';
import { AccountRegisteredHandler } from './core/account-registration/events/account-registered.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: AccountSchema.name,
        schema: SchemaFactory.createForClass(AccountSchema),
      },
    ]),
  ],
  controllers: [PlatformAccessController],
  providers: [
    AccountRegistrationFactory,
    AccountSchemaFactory,
    AccountRegistrationEntityRepository,
    AccountRegistrationFactory,
    RegisterAccountHandler,
    AccountRegisteredHandler,
  ],
})
export class PlatformAccessModule {}
