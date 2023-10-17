import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/modules/db/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'walks' })
export class WalkSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly time: number;

  @Prop()
  readonly date: Date;

  @Prop()
  readonly distance: number;

  @Prop()
  readonly userId: string;
}
