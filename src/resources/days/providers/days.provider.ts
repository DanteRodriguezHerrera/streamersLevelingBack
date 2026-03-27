
import { Day } from '../entities/day.entity';

export const daysProviders = [
  {
    provide: 'DAYS_REPOSITORY',
    useValue: Day,
  },
];
