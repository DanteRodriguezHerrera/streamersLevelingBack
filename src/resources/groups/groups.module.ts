import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { groupsProviders } from './providers/groups.provider';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, ...groupsProviders],
})
export class GroupsModule {}
