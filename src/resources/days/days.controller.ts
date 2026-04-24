import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Roles(Role.Superadmin)
  @Post()
  create(@Body() createDayDto: CreateDayDto) {
    return this.daysService.create(createDayDto);
  }

  @Roles(Role.Superadmin)
  @Get()
  findAll() {
    return this.daysService.findAll();
  }

  @Roles(Role.Superadmin)
  @Get(':day_id')
  findOne(@Param('day_id') day_id: string) {
    return this.daysService.findOne(day_id);
  }

  @Roles(Role.Superadmin)
  @Patch(':day_id')
  update(@Param('day_id') day_id: string, @Body() updateDayDto: UpdateDayDto) {
    return this.daysService.update(day_id, updateDayDto);
  }

  @Roles(Role.Superadmin)
  @Delete(':day_id')
  remove(@Param('day_id') day_id: string) {
    return this.daysService.remove(day_id);
  }
}
