import { Module } from '@nestjs/common';
import { WalksModule } from './modules/walks/walks.module';
import { DatabaseModule } from './modules/db/database.module';

@Module({
  imports: [WalksModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
