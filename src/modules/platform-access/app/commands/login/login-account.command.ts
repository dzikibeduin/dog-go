import { LoginAccountRequestDTO } from 'src/modules/platform-access/dtos/login-account.dto';

export class LoginAccountCommand {
  constructor(public readonly req: LoginAccountRequestDTO) {}
}
