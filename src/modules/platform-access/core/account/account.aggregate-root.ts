import { AggregateRoot } from '@nestjs/cqrs';
import { AccountLoggedInEvent } from './events/accout-logged-in.event';
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
    return this.password;
  }

  login(password: string): void {
    bcrypt.compare(password, hashedPassword); //todo
    this.apply(new AccountLoggedInEvent(this.getId()));
  }
}
