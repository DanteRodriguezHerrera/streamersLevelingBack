import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

import {v4 as uuid} from 'uuid';
import { IRole, RoleResponse, RolesResponse } from 'src/interfaces/roles.interfaces';

@Injectable()
export class RolesService {

  constructor(
    @Inject('ROLES_REPOSITORY') private readonly rolesRepository: typeof Role,
  ) {}

  async create(createRoleDto: CreateRoleDto) : Promise<RoleResponse> {
    try {
      const newRole: IRole = {
        role_id: uuid(),
        ...createRoleDto
      }

      const role = await this.rolesRepository.create(newRole);
      return {
        message: 'Se creó el rol con éxito',
        data: role,
        status: HttpStatus.OK
      }

    } catch (error) {
      console.log(error);
      return {
        message: 'Ocurrió un error al crear el rol',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findAll() : Promise<RolesResponse> {
    try {
      const roles = await this.rolesRepository.findAll();
      if(roles.length === 0) {
        return {
          message: 'No existen roles',
          data: [],
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Se encontraron todos los roles',
        data: roles,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Hubo un error consultando los roles',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async findOne(role_id: string) : Promise<RoleResponse> {
    try {
      const role = await this.rolesRepository.findByPk(role_id);
      if(!role) {
        return {
          message: 'No se encontró ningún rol con este id',
          data: {
            role_id: '',
            role_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        message: 'Rol encontrado correctamente',
        data: role,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Hubo un error consultando el rol',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async update(role_id: string, updateRoleDto: UpdateRoleDto) : Promise<RoleResponse> {
    try {
      const role = await this.rolesRepository.findByPk(role_id);
      if(!role) {
        return {
          message: 'No se encontró ningún rol con este id',
          data: {
            role_id: '',
            role_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      await role.update(updateRoleDto);
      return {
        message: 'Se actualizo el rol correctamente',
        data: role,
        status: HttpStatus.OK
      }

    } catch (error) {
      console.log(error);
      return {
        message: 'Ocurrió un error actualizando el rol',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }

  async remove(role_id: string) : Promise<RoleResponse> {
    try {
      const role = await this.rolesRepository.findByPk(role_id);
      if(!role) {
        return {
          message: 'No se encontró ningún rol con este id',
          data: {
            role_id: '',
            role_name: ''
          },
          status: HttpStatus.NOT_FOUND
        }
      }

      await role.destroy();
      return {
        message: 'Se borro el rol correctamente',
        data: role,
        status: HttpStatus.OK
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Ocurrió un error eliminando el rol',
        status: HttpStatus.BAD_REQUEST,
        data: error
      }
    }
  }
}

