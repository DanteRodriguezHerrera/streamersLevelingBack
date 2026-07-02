import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { Hour } from './entities/hour.entity';
import { HourResponse, HoursResponse, IHour } from 'src/interfaces/hours.interface';

import { v4 as uuid } from 'uuid';
import { Agenda } from '../agenda/entities/agenda.entity';
import { Op } from 'sequelize';
import { User } from '../users/entities/user.entity';
import { Day } from '../days/entities/day.entity';

@Injectable()
export class HoursService {

  constructor(
    @Inject('HOURS_REPOSITORY') private readonly hoursRepository: typeof Hour,
    @Inject('AGENDA_REPOSITORY') private readonly agendaRepository: typeof Agenda,
    @Inject('DAYS_REPOSITORY') private readonly daysRepository: typeof Day
  ) {}

  async create(createHourDto: CreateHourDto) : Promise<HourResponse> {
    try {
      
      const newHour: IHour = {
        hour_id: uuid(),
        ...createHourDto
      }

      const hour = await this.hoursRepository.create(newHour);

      return {
        message: 'La hora se creó correctamente',
        data: hour,
        status: HttpStatus.OK
      }

    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error creando la hora',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findAll() : Promise<HoursResponse> {
    try {
      const hours = await this.hoursRepository.findAll({
        order: [
          ['hour_name', 'ASC']
        ]
      });
      if(hours.length == 0) {
        return {
          message: 'No se encontraron horas registradas',
          data: [],
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontraron las horas correctamente',
        data: hours,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error consultando las horas',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findNoScheduledHours(user_id: string, group_id: string, day_id: string, currentTime: string) : Promise<HoursResponse> {
    try {
      const cleanTime = currentTime.replace(/\s*\([^)]*\)\s*$/, '').trim();
      const now = cleanTime ? new Date(cleanTime) : new Date();

      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chihuahua',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      let weekday = '', hour = '', minute = '';
      for (const part of parts) {
        if (part.type === 'weekday') weekday = part.value;
        if (part.type === 'hour') hour = part.value;
        if (part.type === 'minute') minute = part.value;
      }

      const dayMap: Record<string, number> = {
        Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
      };

      const chihuahuaDayIndex = dayMap[weekday] ?? now.getDay();
      const chihuahuaHourString = `${hour}:${minute}`;

      const myAgenda = await this.agendaRepository.findAll({
        where: {
          user_id: user_id,
          day_id: day_id
        }
      })

      let myHours: any[] = [];

      myAgenda.forEach(agenda => {
        myHours.push(agenda.dataValues.hour_id)
      });

      const fullHours = await this.agendaRepository.findAll({
        where: {
          day_id: day_id
        },
        include: [
          {
            attributes: [],
            model: User,
            where: {
              group_id: group_id
            }
          }
        ]
      })

      const counter = fullHours.reduce((acc, item) => {
        acc[item.hour_id] = (acc[item.hour_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const repeatedTwice = Object.keys(counter).filter(
        hour_id => counter[hour_id] === 2
      );

      myHours.push(...repeatedTwice)

      const dayName = await this.daysRepository.findByPk(day_id);

      const orderDays: Map<string, number> = new Map([
        ['Lunes', 1],
        ['Martes', 2],
        ['Miércoles', 3],
        ['Jueves', 4],
        ['Viernes', 5],
        ['Sábado', 6]
      ]);

      const whereOption = orderDays.get(dayName?.dataValues.day_name)! > chihuahuaDayIndex
        ? { hour_id: { [Op.notIn]: myHours } }
        : { hour_id: { [Op.notIn]: myHours }, hour_name: { [Op.gt]: chihuahuaHourString } };

      const hours = await this.hoursRepository.findAll({
        where: whereOption,
        order: [
          ['hour_name', 'ASC']
        ]
      });

      return {
        message: 'Se encontraron las horas correctamente',
        data: hours,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async findOne(hour_id: string) {
    try {
      
    } catch (error) {
      console.log(error)
      return {
        error
      }
    }
  }

  async update(hour_id: string, updateHourDto: UpdateHourDto) {
    try {
      
    } catch (error) {
      console.log(error)
      return {
        error
      }
    }
  }

  async remove(hour_id: string) {
    try {
      
    } catch (error) {
      console.log(error)
      return {
        error
      }
    }
  }
}
