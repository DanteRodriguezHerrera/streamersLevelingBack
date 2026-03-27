import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { daysProviders } from './providers/days.provider';

@Module({
  controllers: [DaysController],
  providers: [DaysService, ...daysProviders],
})
export class DaysModule {}
