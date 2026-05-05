import { PartialType } from '@nestjs/mapped-types';
import { CreateMoneyReasonDto } from './create-money_reason.dto';

export class UpdateMoneyReasonDto extends PartialType(CreateMoneyReasonDto) {}
