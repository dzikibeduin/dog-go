import { Module } from '@nestjs/common';
import { WalksModule } from './modules/walks/walks.module';

@Module({
  imports: [WalksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
