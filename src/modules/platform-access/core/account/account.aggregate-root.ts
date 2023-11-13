import { AggregateRoot } from '@nestjs/cqrs';
import { AccountLoggedInEvent } from './events/accout-logged-in.event';
import * as bcrypt from 'bcrypt';
import { PasswordMustBeStrongRule } from '../account-registration/rules/password-must-be-strong.rule';
import { UnauthorizedError } from 'src/errors/unathorized.error';

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
    if (new PasswordMustBeStrongRule(password).isSatisfied() === false) {
      throw new UnauthorizedError();
    }
    bcrypt.compare(password, this.getPassword()); //zapytac milczka ewentualnie internety
    this.apply(new AccountLoggedInEvent(this.getId()));
  }
}
