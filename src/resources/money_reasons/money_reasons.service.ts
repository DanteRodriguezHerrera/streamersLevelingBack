import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMoneyReasonDto } from './dto/create-money_reason.dto';
import { UpdateMoneyReasonDto } from './dto/update-money_reason.dto';
import { MoneyReasonInterface, MoneyReasonResponse, MoneyReasonsResponse } from 'src/interfaces/money_reason.interfaces';
import { v4 as uuid } from 'uuid';
import { MoneyReason } from './entities/money_reason.entity';


@Injectable()
export class MoneyReasonsService {

  constructor(
    @Inject('MONEY_REASON_REPOSITORY') private readonly moneyReasonRepository: typeof MoneyReason
  ) {}

  async create(createMoneyReasonDto: CreateMoneyReasonDto) : Promise<MoneyReasonResponse> {
    try {
      const newMoneyReason: MoneyReasonInterface = {
        money_reason_id: uuid(),
        ...createMoneyReasonDto
      }

      const moneyReason = await this.moneyReasonRepository.create(newMoneyReason);

      return {
        message: 'Se creo la razon correctamente',
        data: moneyReason,
        status: HttpStatus.CREATED
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error creando la razón',
        status: HttpStatus.BAD_REQUEST,
        data: error
      };
    }
  }

  async findAll() : Promise<MoneyReasonsResponse> {
    try {
      const moneyReasons = await this.moneyReasonRepository.findAll();
      if(moneyReasons.length === 0) {
        return {
          message: 'No se encontraron las razones',
          data: [],
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontraron las razones',
        data: moneyReasons,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error consultando las razones',
        status: HttpStatus.BAD_REQUEST,
        data: error
      };
    }
  }

  async findOne(idMoneyReason: string) : Promise<MoneyReasonResponse> {
    try {
      const moneyReason = await this.moneyReasonRepository.findByPk(idMoneyReason);
      if(!moneyReason) {
        return {
          message: 'No se encontró la razón',
          data: {
            money_reason_id: '',
            quantity: 0,
            reason: 0,
            description: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontro la razon',
        data: moneyReason,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async update(idMoneyReason: string, updateMoneyReasonDto: UpdateMoneyReasonDto) : Promise<MoneyReasonResponse> {
    try {
      const moneyReason = await this.moneyReasonRepository.findByPk(idMoneyReason);
      if(!moneyReason) {
        return {
          message: 'No se encontró la razón',
          data: {
            money_reason_id: '',
            quantity: 0,
            reason: 0,
            description: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      await moneyReason.update(updateMoneyReasonDto);
      return {
        message: 'Se actualizo la razón',
        data: moneyReason,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Ocurrió un error consultando las razones',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async remove(idMoneyReason: string) : Promise<MoneyReasonResponse> {
    try {
      const moneyReason = await this.moneyReasonRepository.findByPk(idMoneyReason);
      if(!moneyReason) {
        return {
          message: 'No se encontró la razón',
          data: {
            money_reason_id: '',
            quantity: 0,
            reason: 0,
            description: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      await moneyReason.destroy();
      return {
        message: 'Se elimino la razón',
        data: moneyReason,
        status: HttpStatus.OK
      }

    } catch (error) {
      console.log(error)
      return error;
    }
  }
}
