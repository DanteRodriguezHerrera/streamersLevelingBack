import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoneyHistoryService } from './money_history.service';
import { CreateMoneyHistoryDto } from './dto/create-money_history.dto';
import { UpdateMoneyHistoryDto } from './dto/update-money_history.dto';

@Controller('money-history')
export class MoneyHistoryController {
  constructor(private readonly moneyHistoryService: MoneyHistoryService) {}

  @Post()
  create(@Body() createMoneyHistoryDto: CreateMoneyHistoryDto) {
    return this.moneyHistoryService.create(createMoneyHistoryDto);
  }

  @Get()
  findAll(
    @Query('user_id') user_id: string
  ) {
    return this.moneyHistoryService.findAll(user_id);
  }
    
}
