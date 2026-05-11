import { Module } from '@nestjs/common';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';
import { hoursProviders } from './providers/hours.providers';
import { AgendaService } from '../agenda/agenda.service';
import { agendaProviders } from '../agenda/providers/agenda.provider';

@Module({
  controllers: [HoursController],
  providers: [HoursService, ...hoursProviders, AgendaService, ...agendaProviders],
})
export class HoursModule {}
