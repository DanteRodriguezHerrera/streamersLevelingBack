import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(Role.Superadmin)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Roles(Role.Superadmin)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Roles(Role.Superadmin)
  @Get(':role_id')
  findOne(@Param('role_id') role_id: string) {
    return this.rolesService.findOne(role_id);
  }

  @Roles(Role.Superadmin)
  @Patch(':role_id')
  update(@Param('role_id') role_id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(role_id, updateRoleDto);
  }

  @Roles(Role.Superadmin)
  @Delete(':role_id')
  remove(@Param('role_id') role_id: string) {
    return this.rolesService.remove(role_id);
  }
}
