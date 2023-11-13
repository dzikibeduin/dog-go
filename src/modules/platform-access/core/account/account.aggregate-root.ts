import { AggregateRoot } from '@nestjs/cqrs';
import { AccountLoggedInEvent } from './events/accout-logged-in.event';
import { UnauthorizedError } from 'src/errors/unathorized.error';
import { IncomingDataValidationRule } from './rules/incoming-data-validation.rule';

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

  login(password: string): void {
    if (
      new IncomingDataValidationRule(
        password,
        this.getPassword(),
      ).isSatisfied() === false
    ) {
      throw new UnauthorizedError();
    }
    this.apply(new AccountLoggedInEvent(this.getId()));
  }
}
