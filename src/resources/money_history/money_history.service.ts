import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMoneyHistoryDto } from './dto/create-money_history.dto';

import { v4 as uuid } from 'uuid'

import { MoneyHistoriesResponse, IMoneyHistory, MoneyHistoryResponse } from 'src/interfaces/money_history.interfaces';
import { MoneyHistory } from './entities/money_history.entity';
import { UserResponse } from 'src/interfaces/users.interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class MoneyHistoryService {

  constructor(
    @Inject('MONEY_HISTORY_REPOSITORY') private readonly moneyRepository: typeof MoneyHistory,
    private readonly userService: UsersService,
  ) {}

  async create(createMoneyHistoryDto: CreateMoneyHistoryDto) : Promise<MoneyHistoryResponse> {
    try {
      const newMoneyHistory: IMoneyHistory = {
        id_money_history: uuid(),
        date_money_history: new Date(),
        ...createMoneyHistoryDto
      }

      const moneyHistory: IMoneyHistory = await this.moneyRepository.create(newMoneyHistory);

      return {
        message: 'Se creo el historial de monedas correctamente',
        data: moneyHistory,
        status: HttpStatus.OK,
      }

    } catch (error) {
      return {
        message: 'Ocurrió un error creando la transacción de monedas',
        status: HttpStatus.BAD_REQUEST,
        data: error,
      }
    }
  }

  async findAll(user_id: string) : Promise<MoneyHistoriesResponse> {
    try {
      const moneyHistory: IMoneyHistory[] = await this.moneyRepository.findAll({
        where: {
          user_id: user_id
        },
        order: [
          ['date_money_history', 'DESC']
        ]
      });
      
      if(moneyHistory.length == 0) {
        return {
          message: 'No existe el historial',
          data: moneyHistory,
          status: HttpStatus.NOT_FOUND,
        }
      }

      return {
        message: 'Se encontró correctamente el historial',
        data: moneyHistory,
        status: HttpStatus.OK,
      }
    } catch (error) {
      return {
        message: 'No existe el historial',
        data: error,
        status: HttpStatus.NOT_FOUND,
      }
    }
  }

}
