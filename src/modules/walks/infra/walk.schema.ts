import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'walks' })
export class WalkSchema {
  @Prop()
  readonly time: number;

  @Prop()
  readonly date: Date;

  @Prop()
  readonly distance: number;

  @Prop()
  readonly userId: string;
}
