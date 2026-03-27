import { Module } from '@nestjs/common';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';
import { hoursProviders } from './providers/hours.providers';

@Module({
  controllers: [HoursController],
  providers: [HoursService, ...hoursProviders],
})
export class HoursModule {}
