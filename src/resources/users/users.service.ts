import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { IUser } from 'src/interfaces/users.interfaces';
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

  async create(createUserDto: CreateUserDto) {
    try {
      let newUser: IUser = {
        user_id: uuid(),
        ...createUserDto
      }

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

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findByPk(user_id);
      if(!user) {
        return {
          message: 'No existe el usuario',
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
        error
      }
    }
  }

  async remove(user_id: string) {
    try {
      const user = await this.usersRepository.findByPk(user_id);
      if(!user) {
        return {
          message: 'No existe el usuario',
          status: HttpStatus.NOT_FOUND
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
        error
      }
    }
  }
}
