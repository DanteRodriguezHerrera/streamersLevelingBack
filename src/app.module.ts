import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { User } from './resources/users/entities/user.entity';
import { GroupsModule } from './resources/groups/groups.module';
import { Group } from './resources/groups/entities/group.entity';
import { MoneyHistoryModule } from './resources/money_history/money_history.module';
import { MoneyHistory } from './resources/money_history/entities/money_history.entity';
import { DaysModule } from './resources/days/days.module';
import { HoursModule } from './resources/hours/hours.module';
import { AgendaModule } from './resources/agenda/agenda.module';
import { Day } from './resources/days/entities/day.entity';
import { Hour } from './resources/hours/entities/hour.entity';
import { Agenda } from './resources/agenda/entities/agenda.entity';
import { RolesModule } from './resources/roles/roles.module';
import { Role } from './resources/roles/entities/role.entity';
import { TwitchModule } from './resources/twitch/twitch.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD_ROOT,
      database: process.env.DB_NAME,
      models: [
        User,
        Group,
        MoneyHistory,
        Day,
        Hour,
        Agenda,
        Role
      ]
    }),
    UsersModule,
    GroupsModule,
    MoneyHistoryModule,
    DaysModule,
    HoursModule,
    AgendaModule,
    RolesModule,
    TwitchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
