import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterAccountCommand } from '../app/commands/register-account/register-account.command';
import { RegisterAccountRequest } from '../dtos/register-account.dto';

@Controller('platform-access')
export class PlatformAccessController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  async register(
    @Body() registerAccountRequest: RegisterAccountRequest,
  ): Promise<void> {
    await this.commandBus.execute<RegisterAccountCommand, void>(
      new RegisterAccountCommand(registerAccountRequest),
    );
  }
}
