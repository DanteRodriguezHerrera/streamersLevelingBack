import { PartialType } from '@nestjs/mapped-types';
import { CreateMoneyHistoryDto } from './create-money_history.dto';

export class UpdateMoneyHistoryDto extends PartialType(CreateMoneyHistoryDto) {}
