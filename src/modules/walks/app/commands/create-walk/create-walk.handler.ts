import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWalkCommand } from './create-walk.command';

@CommandHandler(CreateWalkCommand)
export class CreateWalkHandler implements ICommandHandler<CreateWalkCommand> {
  constructor() {}

  async execute(command: CreateWalkCommand) {
    // todo
  }
}
