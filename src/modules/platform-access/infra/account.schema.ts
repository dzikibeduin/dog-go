import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/modules/db/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'users' })
export class AccountSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly email: string;

  @Prop()
  readonly password: string;
}
