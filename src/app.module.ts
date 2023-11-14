import { Module } from '@nestjs/common';
import { WalksModule } from './modules/walks/walks.module';
import { DatabaseModule } from './modules/db/database.module';
import { PlatformAccessModule } from './modules/platform-access/platform-access.module';

@Module({
  imports: [WalksModule, DatabaseModule, PlatformAccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
