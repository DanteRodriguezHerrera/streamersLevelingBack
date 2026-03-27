import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from './entities/agenda.entity';
import { AgendaResponse, AgendasResponse, IAgenda } from 'src/interfaces/agenda.interfaces';
import { User } from '../users/entities/user.entity';
import { Hour } from '../hours/entities/hour.entity';
import { Day } from '../days/entities/day.entity';

@Injectable()
export class AgendaService {

  constructor(
    @Inject('AGENDA_REPOSITORY') private readonly agendaRepository: typeof Agenda
  ) {}

  async create(createAgendaDto: CreateAgendaDto) : Promise<AgendaResponse> {
    try {

      const agenda = await this.agendaRepository.create({...createAgendaDto})

      return {
        message: 'Se agendó correctamente la hora',
        data: agenda,
        status: HttpStatus.OK
      }

    } catch (error) {
      return {
        message: 'Ocurrió un error agendando',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findAll() : Promise<AgendasResponse> {
    try {
      const agendas = await this.agendaRepository.findAll();
      if(agendas.length == 0) {
        return { 
          message: 'No hay agendas registradas',
          data: [],
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontraron las agendas correctamente',
        data: agendas,
        status: HttpStatus.OK
      }

    } catch (error) {
      return {
        message: 'Ocurrió un error buscando las agendas',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  // async findOne(id: number) {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }

  // async remove(id: number) {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }

  async getScheduledHours(group_id: string) {
    try {
      const Monday = await this.findByDay(group_id, "Lunes");
      const Tuesday = await this.findByDay(group_id, "Martes");
      const Wednesday = await this.findByDay(group_id, "Miercoles");
      const Thursday = await this.findByDay(group_id, "Jueves");
      const Friday = await this.findByDay(group_id, "Viernes");
      const Saturday = await this.findByDay(group_id, "Sabado");

      const groupAgendas = {
        monday: this.filterDay(Monday),
        tuesday: this.filterDay(Tuesday),
        wednesday: this.filterDay(Wednesday),
        thursday: this.filterDay(Thursday),
        friday: this.filterDay(Friday),
        saturday: this.filterDay(Saturday)
      }

      return groupAgendas;

    } catch (error) {
      console.log(error)
    }
  }

  async findByDay(group_id: string, day_name: string) : Promise<Agenda[]> {
    try {
      const groupDays = await this.agendaRepository.findAll({
        include: [
          {
            model: User,
            attributes: [
              'user_id',
              'group_id',
              'channel_name'
            ],
            where: {
              group_id: group_id
            }
          },
          {
            model: Hour,
          },
          {
            model: Day,
            where: {
              day_name: day_name
            }
          }
        ],
      })

      if(groupDays.length == 0) return [];

      return groupDays
      
    } catch (error) {
        console.log(error)
        return error
    }
  }

  filterDay(day: Agenda[]) {

    let dayArray: any[] = [];

    if(day.length != 0) {
      day.forEach(hour => {
        dayArray.push({
          hour: hour.dataValues.hour,
          user: hour.dataValues.user,
        })
      })
      return dayArray;
    }

    return [];
  }

}
