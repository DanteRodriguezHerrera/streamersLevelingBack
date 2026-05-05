import { MoneyReason } from '../entities/money_reason.entity';

export const moneyReasonProviders = [
  {
    provide: 'MONEY_REASON_REPOSITORY',
    useValue: MoneyReason,
  },
];
