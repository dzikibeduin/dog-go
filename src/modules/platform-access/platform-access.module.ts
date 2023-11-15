import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PlatformAccessController } from './api/platform-access.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AccountSchema } from './infra/account.schema';
import { AccountSchemaFactory } from './infra/account-schema.factory';
import { AccountRegistrationEntityRepository } from './infra/registration/account-registration-entity.repository';
import { AccountRegistrationFactory } from './infra/registration/account-registration.factory';
import { RegisterAccountHandler } from './app/commands/register-account/register-account.handler';
import { AccountRegistrationSchemaFactory } from './infra/account-registration-schema.factory';
import { LoginAccountHandler } from './app/commands/login/login-account.handler';
import { AccountLoginFactory } from './infra/login/account-login.factory';
import { AccountLoginEntityRepository } from './infra/login/account-login-entity.factory';
import { AccountRepositoryImpl } from './infra/login/account.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: AccountSchema.name,
        schema: SchemaFactory.createForClass(AccountSchema),
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [PlatformAccessController],
  providers: [
    AccountRegistrationFactory,
    AccountSchemaFactory,
    AccountLoginEntityRepository,
    AccountLoginFactory,
    AccountRegistrationSchemaFactory,
    AccountRegistrationEntityRepository,
    AccountRegistrationFactory,
    RegisterAccountHandler,
    LoginAccountHandler,
    {
      provide: 'accountRepository',
      useClass: AccountRepositoryImpl,
    },
  ],
})
export class PlatformAccessModule {}
