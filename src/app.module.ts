import { Module } from '@nestjs/common';
import { WalksModule } from './modules/walks/walks.module';
import { PlatformAccessModule } from './modules/platform-access/platform-access.module';

@Module({
  imports: [WalksModule, PlatformAccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
