import { ObjectId } from 'mongodb';

export class WalkDto {
  readonly _id: ObjectId;
  readonly time: number;
  readonly date: Date;
  readonly distance: number;
  readonly dogOwnerId: string;
}
