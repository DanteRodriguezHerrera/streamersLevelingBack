import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { tokenResponse } from 'src/interfaces/twitch.interface';

@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService) {}

  @Get(':code')
  getTwitchToken(@Param('code') code: string) : Promise<tokenResponse> {
    return this.twitchService.getTwitchToken(code);
  }
  
  @Get('/refresh/:refreshToken')
  getNewToken(@Param('refreshToken') refreshToken: string) : Promise<tokenResponse> {
    return this.twitchService.refreshTwitchToken(refreshToken);
  }

}
