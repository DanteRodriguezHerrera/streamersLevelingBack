import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { IUser, UserResponse, UsersResponse } from 'src/interfaces/users.interfaces';
import { Group } from '../groups/entities/group.entity';
import { GroupsService } from '../groups/groups.service';
import { GroupResponse, IGroup } from 'src/interfaces/groups.interfaces';

@Injectable()
export class UsersService {

  constructor (
    @Inject('USERS_REPOSITORY') private readonly  usersRepository: typeof User,
    @Inject('GROUPS_REPOSITORY') private readonly groupsRepository: typeof Group,
    private groupsService: GroupsService
  ) {}

  async create(createUserDto: CreateUserDto) : Promise<UserResponse> {
    try {
      let newUser: IUser = {
        user_id: uuid(),
        ...createUserDto,
      }

      newUser.role_id = 'c3f283bf-1ac3-4c47-a74e-50fb07ad02e7';
      newUser.actual_money = 10;

      const groups: IGroup[] = await this.groupsRepository.findAll();

      if(groups.length == 0) {
        const newGroup: GroupResponse = await this.groupsService.create();
        newUser.group_id = newGroup.data.group_id
      }
      else {
        for (let i = 0; i < groups.length; i++) {
          const { count } = await this.usersRepository.findAndCountAll({
            where: {
              group_id: groups[i].group_id
            }
          })
          if(count < 50) {
            newUser.group_id = groups[i].group_id;
            break;
          }
          else {
            const newGroup: GroupResponse = await this.groupsService.create();
            newUser.group_id = newGroup.data.group_id
          }
        }
      }

      const user: IUser = await this.usersRepository.create(newUser);

      return {
        message: 'Nuevo usuario de twitch registrado',
        data: user,
        status: HttpStatus.OK
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error registrando el usuario',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findAll() : Promise<UsersResponse> {
    try {
      const users = await this.usersRepository.findAll()
      
      if(!users) return { 
        message: 'No se encontraron usuarios',
        data: [],
        status: HttpStatus.NOT_FOUND
      }

      return {
        message: 'Se encontraron correctamente todos los usuarios',
        data: users,
        status: HttpStatus.OK
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error al encontrar los usuarios',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findOne(user_id: string) : Promise<UserResponse> {

    //   async getUser() {

    //   const headers = new Headers()

    //   headers.append('Authorization', 'Bearer eu4qifgzg3xy6hyhh8yzmoe29y4tfc')
    //   headers.append('client-Id', 'asbp5fyz7toklrqthtkyk6k4i3w9xe')

    //   const response = await fetch('https://api.twitch.tv/helix/users?id=540725944', { headers: headers })

    //   return await response.json();
    // }

    try {
      const user = await this.usersRepository.findByPk(user_id)
      if(!user) return { 
        message: "Usuario no registrado",
        status: HttpStatus.NO_CONTENT,
        data: {
          user_id: '',
          twitch_id: '',
          role_id: '',
          group_id: null,
          access_token: '',
          expires_in: 0,
          refresh_token: '',
          actual_money: 0
        }
      }
      return {
        message: "Usuario encontrado correctamente",
        data: user,
        status: HttpStatus.CREATED,
      }
    } catch (error) {
      return {
        message: "Ocurrió un error buscando al usuario",
        data: error,
        status: HttpStatus.CREATED,
      }
    }
  }

  async findByGroup(group_id: string | null) : Promise<UsersResponse> {
    try {
      const users = await this.usersRepository.findAll({
        attributes: [
          'user_id',
          'channel_name'
        ],
        where: {
          group_id: group_id
        }
      })

      const messageResponse = users.length === 0 ? 'No se encontraron usuarios en este grupo' : 'Se encontraron correctamente todos los usuarios del grupo'
      
      return {
        message: messageResponse,
        data: users,
        status: HttpStatus.OK
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error al encontrar los usuarios',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) : Promise<UserResponse> {
    try {
      const user = await this.usersRepository.findByPk(user_id);
      if(!user) {
        return {
          message: 'No existe el usuario',
          data: {
            user_id: '',
            twitch_id: '',
            role_id: '',
            group_id: null,
            access_token: '',
            expires_in: 0,
            refresh_token: '',
            actual_money: 0
          },
          status: HttpStatus.NOT_FOUND
        }
      }
      await user.update(updateUserDto);
      return {
        status: HttpStatus.OK,
        message: "Usuario actualizado correctamente",
        data: user
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error al actualizar al usuario',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async remove(user_id: string) : Promise<UserResponse> {
    try {
      const user = await this.usersRepository.findByPk(user_id);
      if(!user) {
        return {
          message: 'No existe el usuario',
          status: HttpStatus.NOT_FOUND,
          data: {
            user_id: '',
            twitch_id: '',
            role_id: '',
            group_id: null,
            access_token: '',
            expires_in: 0,
            refresh_token: '',
            actual_money: 0
          },
        }
      }
      await user.destroy();
      return {
        status: HttpStatus.OK,
        message: `Usuario con id ${user_id} ha sido eliminado correctamente`,
        data: user
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error al eliminar el usuario',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

}
