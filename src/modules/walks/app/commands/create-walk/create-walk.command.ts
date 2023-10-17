import { CreateWalkRequest } from 'src/modules/walks/dtos/create-walk-request.dto';

export class CreateWalkCommand {
  constructor(public readonly req: CreateWalkRequest) {}
}
