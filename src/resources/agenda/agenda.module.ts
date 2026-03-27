import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { agendaProviders } from './providers/agenda.provider';

@Module({
  controllers: [AgendaController],
  providers: [AgendaService, ...agendaProviders],
})
export class AgendaModule {}
