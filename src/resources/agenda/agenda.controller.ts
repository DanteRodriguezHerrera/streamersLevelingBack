import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import type { SearchLiveStreams } from 'src/interfaces/agenda.interfaces';

@Controller('agenda')
export class AgendaController {
  
  constructor(private readonly agendaService: AgendaService) {}

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Post('todayStreams')
  findLiveStreams(@Body () searchLiveStreams: SearchLiveStreams) {
    return this.agendaService.findTodayStreams(searchLiveStreams);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get('scheduled/:group_id')
  findScheduledHours(@Param('group_id') group_id: string) {
    return this.agendaService.getScheduledHours(group_id);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get('my-hours/:user_id')
  findAgendaByUser(@Param('user_id') user_id: string) {
    return this.agendaService.findByUser(user_id)
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Delete('deleteHour/:user_id/:day_id/:hour_id')
  deleteOneHourScheduled(
    @Param('user_id') user_id: string,
    @Param('day_id') day_id: string,
    @Param('hour_id') hour_id: string
  ) { 
    return this.agendaService.deleteOneHourScheduled(user_id, day_id, hour_id);
  }

}
