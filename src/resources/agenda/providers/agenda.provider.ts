
import { Agenda } from '../entities/agenda.entity';

export const agendaProviders = [
  {
    provide: 'AGENDA_REPOSITORY',
    useValue: Agenda,
  },
];
