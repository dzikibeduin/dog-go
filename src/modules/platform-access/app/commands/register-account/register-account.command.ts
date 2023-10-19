import { RegisterAccountRequestDTO } from 'src/modules/platform-access/dtos/register-account.dto';

export class RegisterAccountCommand {
  constructor(public readonly req: RegisterAccountRequestDTO) {}
}
