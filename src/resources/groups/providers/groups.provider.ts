
import { Group } from '../entities/group.entity';

export const groupsProviders = [
  {
    provide: 'GROUPS_REPOSITORY',
    useValue: Group,
  },
];
