import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PlatformAccessController } from './api/platform-access.controller';

@Module({
  imports: [CqrsModule],
  controllers: [PlatformAccessController],
  providers: [],
})
export class PlatformAccessModule {}
