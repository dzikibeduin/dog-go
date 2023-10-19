import { Body, Controller, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterAccountCommand } from '../app/commands/register-account/register-account.command';
import { RegisterAccountRequestDTO } from '../dtos/register-account.dto';
import { LoginAccountRequestDTO } from '../dtos/login-account.dto';
import { LoginAccountCommand } from '../app/commands/login/login-account.command';

@Controller('platform-access')
export class PlatformAccessController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  async register(
    @Body() registerAccountRequestDTO: RegisterAccountRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute<RegisterAccountCommand, void>(
      new RegisterAccountCommand(registerAccountRequestDTO),
    );
  }

  @Post('login')
  async login(
    @Body() loginAcountrequestDTO: LoginAccountRequestDTO,
    @Response() res: ExpressResponse,
  ) {
    await this.commandBus.execute<LoginAccountCommand, void>(
      new LoginAccountCommand(loginAcountrequestDTO),
    );
    res.status(200).json({ accessToken: res });
  }
}
