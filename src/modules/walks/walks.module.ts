import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WalksController } from './api/walks.controller';

@Module({
  imports: [CqrsModule],
  controllers: [WalksController],
  providers: [],
})
export class WalksModule {}
