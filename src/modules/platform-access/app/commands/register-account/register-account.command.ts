import { RegisterAccountRequest } from 'src/modules/platform-access/dtos/register-account.dto';

export class RegisterAccountCommand {
  constructor(public readonly req: RegisterAccountRequest) {}
}
