import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WalksController } from './api/walks.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { WalkSchema } from './infra/walk.schema';
import { WalkFactory } from './infra/walk.factory';
import { WalkDtoRepository } from './infra/walk-dto.repository';
import { WalkEntityRepository } from './infra/walk-entity.repository';
import { WalkSchemaFactory } from './infra/walk-schema.factory';
import { CreateWalkCommand } from './app/commands/create-walk/create-walk.command';
import { WalkCreatedEvent } from './core/walk/events/walk-created.event';
import { GetDailyWalksQuery } from './app/queries/get-daily-walks/get-daily-walks.query';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: WalkSchema.name,
        schema: SchemaFactory.createForClass(WalkSchema),
      },
    ]),
  ],
  controllers: [WalksController],
  providers: [
    WalkFactory,
    WalkDtoRepository,
    WalkEntityRepository,
    WalkSchemaFactory,
    CreateWalkCommand,
    WalkCreatedEvent,
    GetDailyWalksQuery,
  ],
})
export class WalksModule {}
