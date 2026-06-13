import { Module } from '@nestjs/common';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';
import { hoursProviders } from './providers/hours.providers';
import { AgendaService } from '../agenda/agenda.service';
import { agendaProviders } from '../agenda/providers/agenda.provider';
import { DaysService } from '../days/days.service';
import { daysProviders } from '../days/providers/days.provider';

@Module({
  controllers: [HoursController],
  providers: [HoursService, ...hoursProviders, AgendaService, ...agendaProviders, DaysService, ...daysProviders],
})
export class HoursModule {}
