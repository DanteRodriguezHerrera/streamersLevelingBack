import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Get('/byGroup/:group_id')
  findByGroup(@Param('group_id') group_id: string) {
    return this.usersService.findByGroup(group_id);
  }

  @Roles(Role.Superadmin, Role.Admin, Role.Streamer)
  @Patch(':user_id')
  update(@Param('user_id') user_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Roles(Role.Superadmin)
  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
