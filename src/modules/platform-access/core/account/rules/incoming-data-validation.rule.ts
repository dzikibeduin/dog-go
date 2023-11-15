import * as bcrypt from 'bcrypt';

export class IncomingDataValidationRule {
  constructor(
    private readonly password: string,
    private readonly hashedPassword: string,
  ) {}

  async isSatisfied(): Promise<boolean> {
    return await bcrypt.compare(this.password, this.hashedPassword); //zapytac milczka ewentualnie internety
  }
}
