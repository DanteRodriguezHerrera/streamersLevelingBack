import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create() {
    return this.groupsService.create();
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':idGroup')
  findOne(@Param('idGroup') idGroup: string) {
    return this.groupsService.findOne(idGroup);
  }

  @Patch(':idGroup')
  update(@Param('idGroup') idGroup: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(idGroup, updateGroupDto);
  }

  @Delete(':idGroup')
  remove(@Param('idGroup') idGroup: string) {
    return this.groupsService.remove(idGroup);
  }
}
