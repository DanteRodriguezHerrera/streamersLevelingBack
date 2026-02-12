import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { User } from './resources/users/entities/user.entity';
import { GroupsModule } from './resources/groups/groups.module';
import { Group } from './resources/groups/entities/group.entity';

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
        Group
      ]
    }),
    UsersModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
