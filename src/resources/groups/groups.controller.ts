import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles(Role.Superadmin)
  @Post()
  create() {
    return this.groupsService.create();
  }

  @Roles(Role.Superadmin)
  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get(':idGroup')
  findOne(@Param('idGroup') idGroup: string) {
    return this.groupsService.findOne(idGroup);
  }

  @Roles(Role.Superadmin)
  @Patch(':idGroup')
  update(@Param('idGroup') idGroup: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(idGroup, updateGroupDto);
  }

  @Roles(Role.Superadmin)
  @Delete(':idGroup')
  remove(@Param('idGroup') idGroup: string) {
    return this.groupsService.remove(idGroup);
  }
}
