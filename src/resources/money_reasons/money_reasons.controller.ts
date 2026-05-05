import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoneyReasonsService } from './money_reasons.service';
import { CreateMoneyReasonDto } from './dto/create-money_reason.dto';
import { UpdateMoneyReasonDto } from './dto/update-money_reason.dto';
import { MoneyReasonResponse, MoneyReasonsResponse } from 'src/interfaces/money_reason.interfaces';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('money-reasons')
export class MoneyReasonsController {
  constructor(private readonly moneyReasonsService: MoneyReasonsService) {}

  @Roles(Role.Superadmin)
  @Post()
  create(@Body() createMoneyReasonDto: CreateMoneyReasonDto) : Promise<MoneyReasonResponse> {
    return this.moneyReasonsService.create(createMoneyReasonDto);
  }

  @Roles(Role.Superadmin)
  @Get()
  findAll() : Promise<MoneyReasonsResponse> {
    return this.moneyReasonsService.findAll();
  }

  @Roles(Role.Superadmin)
  @Get(':idMoneyReason')
  findOne(@Param('idMoneyReason') idMoneyReason: string) {
    return this.moneyReasonsService.findOne(idMoneyReason);
  }

  @Roles(Role.Superadmin)
  @Patch(':idMoneyReason')
  update(@Param('idMoneyReason') idMoneyReason: string, @Body() updateMoneyReasonDto: UpdateMoneyReasonDto) {
    return this.moneyReasonsService.update(idMoneyReason, updateMoneyReasonDto);
  }

  @Roles(Role.Superadmin)
  @Delete(':idMoneyReason')
  remove(@Param('idMoneyReason') idMoneyReason: string) {
    return this.moneyReasonsService.remove(idMoneyReason);
  }
}
