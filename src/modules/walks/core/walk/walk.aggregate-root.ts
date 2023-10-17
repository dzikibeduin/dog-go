import { AggregateRoot } from '@nestjs/cqrs';

export class Walk extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly time: number,
    private readonly date: Date,
    private readonly distance: number,
    private readonly userId: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getTime(): number {
    return this.time;
  }

  getDate(): Date {
    return this.date;
  }

  getDistance(): number {
    return this.distance;
  }

  getUserId(): string {
    return this.userId;
  }
}
