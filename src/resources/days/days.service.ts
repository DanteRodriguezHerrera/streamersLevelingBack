import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

import { Day } from './entities/day.entity';

import { v4 as uuid} from 'uuid';
import { DayResponse, DaysResponse, IDay } from 'src/interfaces/days.interfaces';

@Injectable()
export class DaysService {

  constructor(
    @Inject('DAYS_REPOSITORY') private dayRepository: typeof Day
  ) {}

  async create(createDayDto: CreateDayDto) : Promise<DayResponse> {
    try {
      const newDay: IDay = {
        day_id: uuid(),
        ...createDayDto
      }

      const day = await this.dayRepository.create(newDay);
      return {
        message: 'Se creó el dia correctamente',
        data: day,
        status: HttpStatus.OK
      }
      
    } catch (error) {
      return {
        message: 'Ocurrió un error creando el día',
        status: HttpStatus.BAD_REQUEST,
        data: error,
      }
    }
  }

  async findAll() : Promise<DaysResponse> {
    try {
      const days = await this.dayRepository.findAll();
      if(days.length == 0) {
        return {
          message: 'No se encontraron días registrados',
          data: [],
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontraron correctamente los días',
        data: days,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error consultando los días',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findOne(day_id: string) : Promise<DayResponse> {
    try {
      const day = await this.dayRepository.findByPk(day_id);
      if(!day) {
        return {
          message: 'No se encontró el día',
          data: {
            day_id: '',
            day_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontró el día correctamente',
        data: day,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error buscando el día',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async update(day_id: string, updateDayDto: UpdateDayDto) : Promise<DayResponse> {
    try {
      const day = await this.dayRepository.findByPk(day_id);
      if(!day) {
        return {
          message: 'No se encontró el día',
          data: {
            day_id: '',
            day_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      await day.update(updateDayDto);

      return {
        message: 'Se actualizó el día correctamente',
        data: day,
        status: HttpStatus.OK
      }

    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error actualizando el día',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async remove(day_id: string) : Promise<DayResponse> {
    try {
      const day = await this.dayRepository.findByPk(day_id);
      if(!day) {
        return {
          message: 'No se encontró el día',
          data: {
            day_id: '',
            day_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }
      
      await day.destroy();
      return {
        message: 'Se eliminó el día correctamente',
        data: day,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error eliminando el día',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }
}
