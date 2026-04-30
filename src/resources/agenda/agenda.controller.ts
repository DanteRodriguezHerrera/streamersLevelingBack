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
  @Get('scheduled')
  findScheduledHours() {
    return this.agendaService.getScheduledHours('6076c3d4-674d-495c-8098-78e306bc8ebf');
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) { 
  //   return this.agendaService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.agendaService.remove(+id);
  // }
}
