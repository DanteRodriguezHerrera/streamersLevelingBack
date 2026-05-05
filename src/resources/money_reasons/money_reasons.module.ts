import { Module } from '@nestjs/common';
import { MoneyReasonsService } from './money_reasons.service';
import { MoneyReasonsController } from './money_reasons.controller';
import { moneyReasonProviders } from './providers/money_reason.provider';

@Module({
  controllers: [MoneyReasonsController],
  providers: [MoneyReasonsService, ...moneyReasonProviders],
})
export class MoneyReasonsModule {}
