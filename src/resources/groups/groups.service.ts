import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupResponse, GroupsResponse, IGroup } from 'src/interfaces/groups.interfaces';

import { v4 as uuid } from 'uuid';

@Injectable()
export class GroupsService {

  constructor(
    @Inject('GROUPS_REPOSITORY') private readonly groupsRepository: typeof Group,
  ) {}

  ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVXYZ"

  async create() : Promise<GroupResponse> {

    let newGroup: IGroup = {
      group_id: '',
      group_name: ''
    }

    try {
      const groupExists = await this.groupsRepository.findOne({
        order: [
          ['group_name', 'DESC']
        ]
      })

      newGroup.group_id = uuid();
      newGroup.group_name = !groupExists ? this.ALPHABET.charAt(0) : this.ALPHABET.charAt(this.ALPHABET.indexOf(groupExists.dataValues.group_name) + 1)

      const group: IGroup = await this.groupsRepository.create(newGroup);
      return {
        message: 'El grupo se creó con éxito',
        data: group,
        status: HttpStatus.OK,
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error creando el grupo',
        status: HttpStatus.BAD_REQUEST,
        data: error,
      }
    }
  }

  async findAll() : Promise<GroupsResponse> {
    try {
      const groups = await this.groupsRepository.findAll();
      if(groups.length == 0) {
        return {
          message: 'No existen grupos',
          status: HttpStatus.NOT_FOUND,
          data: []
        }
      }

      return {
        message: 'Se encontraron todos los grupos correctamente',
        data: groups,
        status: HttpStatus.OK,
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error al encontrar todos los grupos',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findOne(idGroup: string) : Promise<GroupResponse> {
    try {
      const group = await this.groupsRepository.findByPk(idGroup);
      if(!group) {
        return {
          message: 'No existe el grupo',
          data: {
            group_id: '',
            group_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontró el grupo correctamente',
        data: group,
        status: HttpStatus.OK,
      }
    } catch (error) {
      return {
        message: 'Ocurrió un error buscando el grupo',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async update(idGroup: string, updateGroupDto: UpdateGroupDto) {
    try {
      
    } catch (error) {
      
    }
  }

  async remove(idGroup: string) {
    try {
      const group = await this.groupsRepository.findByPk(idGroup);
      if(!group) {
        return {
          message: 'No existe el grupo',
          status: HttpStatus.NOT_FOUND
        }
      }
      await group.destroy();
      return {
        message: 'Se elimino el grupo correctamente',
        status: HttpStatus.OK
      }
    } catch (error) {
      return {
        error
      }
    }
  }
}
