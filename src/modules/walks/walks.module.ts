import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WalksController } from './api/walks.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { WalkSchema } from './infra/walk.schema';
import { WalkFactory } from './infra/walk.factory';
import { WalkDtoRepository } from './infra/walk-dto.repository';
import { WalkEntityRepository } from './infra/walk-entity.repository';
import { WalkSchemaFactory } from './infra/walk-schema.factory';
import { GetDailyWalksHandler } from './app/queries/get-daily-walks/get-daily-walks.handler';
import { WalkCreatedHandler } from './core/walk/events/walk-created.handler';
import { CreateWalkHandler } from './app/commands/create-walk/create-walk.handler';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: WalkSchema.name,
        schema: SchemaFactory.createForClass(WalkSchema),
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [WalksController],
  providers: [
    AuthenticationGuard,
    WalkFactory,
    WalkDtoRepository,
    WalkEntityRepository,
    WalkSchemaFactory,
    CreateWalkHandler,
    WalkCreatedHandler,
    GetDailyWalksHandler,
  ],
})
export class WalksModule {}
