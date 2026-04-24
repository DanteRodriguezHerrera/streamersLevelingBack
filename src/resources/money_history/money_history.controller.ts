import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoneyHistoryService } from './money_history.service';
import { CreateMoneyHistoryDto } from './dto/create-money_history.dto';

import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('money-history')
export class MoneyHistoryController {
  constructor(private readonly moneyHistoryService: MoneyHistoryService) {}

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Post()
  create(@Body() createMoneyHistoryDto: CreateMoneyHistoryDto) {
    return this.moneyHistoryService.create(createMoneyHistoryDto);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get()
  findAll(
    @Query('user_id') user_id: string
  ) {
    return this.moneyHistoryService.findAll(user_id);
  }
    
}
