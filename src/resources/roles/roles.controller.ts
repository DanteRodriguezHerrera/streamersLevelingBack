import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':role_id')
  findOne(@Param('role_id') role_id: string) {
    return this.rolesService.findOne(role_id);
  }

  @Patch(':role_id')
  update(@Param('role_id') role_id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(role_id, updateRoleDto);
  }

  @Delete(':role_id')
  remove(@Param('role_id') role_id: string) {
    return this.rolesService.remove(role_id);
  }
}
