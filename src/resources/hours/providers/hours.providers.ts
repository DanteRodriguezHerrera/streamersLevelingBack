
import { Hour } from '../entities/hour.entity';

export const hoursProviders = [
  {
    provide: 'HOURS_REPOSITORY',
    useValue: Hour,
  },
];
