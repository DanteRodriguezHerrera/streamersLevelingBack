import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';

@Controller('agenda')
export class AgendaController {
  
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto);
  }

  @Get()
  findAll() {
    return this.agendaService.findAll();
  }

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
