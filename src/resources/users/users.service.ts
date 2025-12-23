import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor (
    @Inject('USERS_REPOSITORY')
    private readonly  usersRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        user_id: uuid(),
        ...createUserDto
      }

      const user = await this.usersRepository.create(newUser);

      return {
        message: 'Nuevo usuario de twitch registrado',
        data: user
      }
    } catch (error) {
      return {
        error
      }
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.findAll()
      if(!users) return { message: 'No se encontraron usuarios' }
      return {
        message: 'Se encontraron correctamente todos los usuarios',
        data: users
      }
    } catch (error) {
      return {
        error
      }
    }
  }

  async findOne(user_id: string) {

    //   async getUser() {

    //   const headers = new Headers()

    //   headers.append('Authorization', 'Bearer eu4qifgzg3xy6hyhh8yzmoe29y4tfc')
    //   headers.append('client-Id', 'asbp5fyz7toklrqthtkyk6k4i3w9xe')

    //   const response = await fetch('https://api.twitch.tv/helix/users?id=540725944', { headers: headers })

    //   return await response.json();
    // }

    try {
      const user = await this.usersRepository.findOne({
        where: {
          twitch_id: user_id
        }
      })
      if(!user) return { 
        status: HttpStatus.NO_CONTENT,
        message: "Usuario no registrado",
      }
      return {
        status: HttpStatus.CREATED,
        message: "Usuario encontrado correctamente",
        data: user
      }
    } catch (error) {
      return {
        error
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {

    } catch (error) {

    }
  }

  async remove(id: string) {
    try {

    } catch (error) {

    }
  }
}
