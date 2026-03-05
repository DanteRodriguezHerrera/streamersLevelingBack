
import { MoneyHistory } from '../entities/money_history.entity';

export const moneyHistoryProviders = [
  {
    provide: 'MONEY_HISTORY_REPOSITORY',
    useValue: MoneyHistory,
  },
];
