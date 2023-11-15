import { AggregateRoot } from '@nestjs/cqrs';
import { AccountLoggedInEvent } from './events/accout-logged-in.event';
import { IncomingDataValidationRule } from './rules/incoming-data-validation.rule';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class Account extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly email: string,
    private readonly password: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return bcrypt.hash(this.password);
  }

  async login(password: string): Promise<void> {
    const incomingDataValidationRule = new IncomingDataValidationRule(
      password,
      this.getPassword(),
    );
    const isSatisfied = await incomingDataValidationRule.isSatisfied();
    console.log(isSatisfied);
    console.log(isSatisfied);
    if (isSatisfied === false) {
      throw new HttpException('Unauthorized', 401);
    }
    this.apply(new AccountLoggedInEvent(this.getId()));
  }
}
