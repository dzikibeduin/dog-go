import { AggregateRoot } from '@nestjs/cqrs';
import { AccountLoggedInEvent } from './events/accout-logged-in.event';
import { IncomingDataValidationRule } from './rules/incoming-data-validation.rule';
import { UnauthorizedException } from '@nestjs/common';

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
    return this.password;
  }

  async login(password: string): Promise<void> {
    const incomingDataValidationRule = new IncomingDataValidationRule(
      password,
      this.getPassword(),
    );
    const isSatisfied = await incomingDataValidationRule.isSatisfied();

    if (isSatisfied === false) {
      throw new UnauthorizedException();
    }
    this.apply(new AccountLoggedInEvent(this.getId()));
  }
}
