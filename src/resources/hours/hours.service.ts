import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { Hour } from './entities/hour.entity';
import { HourResponse, HoursResponse, IHour } from 'src/interfaces/hours.interface';

import { v4 as uuid } from 'uuid';

@Injectable()
export class HoursService {

  constructor(
    @Inject('HOURS_REPOSITORY') private readonly hoursRepository: typeof Hour,
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
