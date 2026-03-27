import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoursService } from './hours.service';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';

@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  create(@Body() createHourDto: CreateHourDto) {
    return this.hoursService.create(createHourDto);
  }

  @Get()
  findAll() {
    return this.hoursService.findAll();
  }

  @Get(':hour_id')
  findOne(@Param('hour_id') hour_id: string) {
    return this.hoursService.findOne(hour_id);
  }

  @Patch(':hour_id')
  update(@Param('hour_id') hour_id: string, @Body() updateHourDto: UpdateHourDto) {
    return this.hoursService.update(hour_id, updateHourDto);
  }

  @Delete(':hour_id')
  remove(@Param('hour_id') hour_id: string) {
    return this.hoursService.remove(hour_id);
  }
}
