import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://admin_user:admin_pass@localhost:27017/database?authSource=admin&retryWrites=true&w=majority`,
    ),
  ],
})
export class DatabaseModule {}
