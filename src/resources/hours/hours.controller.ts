import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoursService } from './hours.service';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';

import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Roles(Role.Superadmin)
  @Post()
  create(@Body() createHourDto: CreateHourDto) {
    return this.hoursService.create(createHourDto);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get()
  findAll() {
    return this.hoursService.findAll();
  }

  @Roles(Role.Superadmin)
  @Get(':hour_id')
  findOne(@Param('hour_id') hour_id: string) {
    return this.hoursService.findOne(hour_id);
  }

  @Roles(Role.Superadmin)
  @Patch(':hour_id')
  update(@Param('hour_id') hour_id: string, @Body() updateHourDto: UpdateHourDto) {
    return this.hoursService.update(hour_id, updateHourDto);
  }

  @Roles(Role.Superadmin)
  @Delete(':hour_id')
  remove(@Param('hour_id') hour_id: string) {
    return this.hoursService.remove(hour_id);
  }
}
