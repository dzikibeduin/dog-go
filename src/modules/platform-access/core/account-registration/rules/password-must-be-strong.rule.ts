export class PasswordMustBeStrongRule {
  constructor(private readonly password: string) {}

  isSatisfied(): boolean {
    return this.password.length > 8 && this.password.length < 20;
  }
}
