import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
})
export class AppModule {}
