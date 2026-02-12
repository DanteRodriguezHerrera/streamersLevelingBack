import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './providers/users.provider';
import { groupsProviders } from '../groups/providers/groups.provider';
import { GroupsService } from '../groups/groups.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GroupsService, ...usersProviders, ...groupsProviders],
})
export class UsersModule { }
