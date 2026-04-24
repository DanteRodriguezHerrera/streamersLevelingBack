import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './providers/users.provider';
import { groupsProviders } from '../groups/providers/groups.provider';
import { GroupsService } from '../groups/groups.service';
import { RolesService } from '../roles/roles.service';
import { rolesProviders } from '../roles/providers/role.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GroupsService, RolesService, ...usersProviders, ...groupsProviders, ...rolesProviders],
})
export class UsersModule { }
