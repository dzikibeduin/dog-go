import {
  Body,
  Controller,
  HttpStatus,
  Next,
  Post,
  Response,
} from '@nestjs/common';
import { Response as ExpressResponse, NextFunction } from 'express';
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
    @Response() res: ExpressResponse,
    @Next() next: NextFunction,
  ): Promise<void> {
    await this.commandBus
      .execute<RegisterAccountCommand, void>(
        new RegisterAccountCommand(registerAccountRequestDTO),
      )
      .then(() => res.status(HttpStatus.CREATED).send())
      .catch(next);
  }

  @Post('login')
  async login(
    @Body() loginAcountrequestDTO: LoginAccountRequestDTO,
    @Response() res: ExpressResponse,
    @Next() next: NextFunction,
  ) {
    await this.commandBus
      .execute<LoginAccountCommand, void>(
        new LoginAccountCommand(loginAcountrequestDTO),
      )
      .then((accessToken) =>
        res.status(HttpStatus.OK).json({
          accessToken,
        }),
      )
      .catch(next);
  }
}
