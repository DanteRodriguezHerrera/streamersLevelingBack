import { Module } from '@nestjs/common';
import { MoneyHistoryService } from './money_history.service';
import { MoneyHistoryController } from './money_history.controller';
import { moneyHistoryProviders } from './providers/money_history.provider';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/providers/users.provider';
import { GroupsService } from '../groups/groups.service';
import { groupsProviders } from '../groups/providers/groups.provider';
import { rolesProviders } from '../roles/providers/role.provider';

@Module({
  controllers: [MoneyHistoryController],
  providers: [MoneyHistoryService, ...moneyHistoryProviders, UsersService, GroupsService, ...usersProviders, ...groupsProviders, ...rolesProviders],
})
export class MoneyHistoryModule {}
