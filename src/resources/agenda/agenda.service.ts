import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { Agenda } from './entities/agenda.entity';
import { AgendaResponse, AgendasResponse, SearchLiveStreams } from 'src/interfaces/agenda.interfaces';
import { User } from '../users/entities/user.entity';
import { Hour } from '../hours/entities/hour.entity';
import { Day } from '../days/entities/day.entity';
import { Op } from 'sequelize';
import { Cron } from '@nestjs/schedule';

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

  async findTodayStreams(searchLiveStreams: SearchLiveStreams) {
    const streamsOptions = {
      attributes: [],
      include: [
        {
          model: User,
          attributes: [
            'user_id',
            'group_id',
            'channel_name'
          ],
          where: {
            group_id: searchLiveStreams.group_id
          }
        },
        {
          model: Day,
          where: {
            day_name: searchLiveStreams.day_name
          }
        },
        {
          model: Hour,
          where: {
            hour_name: {}
          },
        }
      ],
    }

    try {
      streamsOptions.include[2].where.hour_name = {
        [Op.eq]: searchLiveStreams.hour_name
      }

      const liveStreams = await this.agendaRepository.findAll(streamsOptions);

      streamsOptions.include[2].where.hour_name = {
        [Op.gt]: searchLiveStreams.hour_name
      }

      const scheduledStreams = await this.agendaRepository.findAll(streamsOptions)

      if(liveStreams.length === 0 && scheduledStreams.length === 0) {
        return { 
          message: 'No hay streams agendados hoy',
          data: {
            live: [],
            scheduled: []
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontraron los streams agendados correctamente',
        data: {
          live: liveStreams,
          scheduled: scheduledStreams
        },
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

  async getScheduledHours(group_id: string) {
    try {
      const Monday = await this.findByDay(group_id, "Lunes");
      const Tuesday = await this.findByDay(group_id, "Martes");
      const Wednesday = await this.findByDay(group_id, "Miércoles");
      const Thursday = await this.findByDay(group_id, "Jueves");
      const Friday = await this.findByDay(group_id, "Viernes");
      const Saturday = await this.findByDay(group_id, "Sábado");

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

  async findByUser(user_id: string) : Promise<AgendasResponse> {
    try {
      const userAgenda = await this.agendaRepository.findAll({
        attributes: [
          'user_id'
        ],
        where: {
          user_id: user_id
        },
        include: [
          {
            model: Day
          },
          {
            model: Hour
          }
      ]
      })
  
      if(userAgenda.length === 0) {
        return {
          message: 'No se encontraron horas agendadas',
          data: [],
          status: HttpStatus.NOT_FOUND
        }
      }
  
      return {
        message: 'Se encontraron horas agendadas',
        data: userAgenda,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteOneHourScheduled(user_id: string, day_id: string, hour_id: string) : Promise<AgendaResponse> {
    try {
      const deletedSchedule = await this.agendaRepository.findOne({
        where: {
          user_id: user_id,
          day_id: day_id,
          hour_id: hour_id
        },
        include: [
          {
            model: Day
          },
          {
            model: Hour
          }
        ]
      })

      if(!deletedSchedule) {
        return {
          message: 'No existe esa hora agendada',
          data: {
            user_id: '',
            day_id: '',
            hour_id: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      await deletedSchedule.destroy();

      return {
        message: 'Se elimino correctamente la hora agendada',
        data: deletedSchedule,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  @Cron('0 0 * * 0')
  async cleanAgenda() {
    try {
      console.log("Se limpio la agenda")
      await this.agendaRepository.destroy({
        truncate: true
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
