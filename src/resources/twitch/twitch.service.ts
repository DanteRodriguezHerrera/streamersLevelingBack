import { Injectable } from '@nestjs/common';
import { tokenResponse } from 'src/interfaces/twitch.interface';

@Injectable()
export class TwitchService {

  async getTwitchToken(twitchCode: string) : Promise<tokenResponse> {

    let client_id: string = '';
    let client_secret: string = '';

    if(process.env.CLIENT_ID && process.env.CLIENT_SECRET) {
      client_id = process.env.CLIENT_ID;
      client_secret = process.env.CLIENT_SECRET;
    }

    try {
      const twitchTokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
        method: "POST",
        body: new URLSearchParams({
          client_id: client_id,
          client_secret: client_secret,
          code: twitchCode,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:4200/login'
        })
      })

      const result = await twitchTokenResponse.json();
      return result

    } catch (error: any) {
      console.log(error)
      return error;
    }
  }

  async refreshTwitchToken(refreshToken: string) : Promise<tokenResponse> {
    let client_id: string = '';
    let client_secret: string = '';

    if(process.env.CLIENT_ID && process.env.CLIENT_SECRET) {
      client_id = process.env.CLIENT_ID;
      client_secret = process.env.CLIENT_SECRET;
    }

    try {
      const twitchTokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
        method: "POST",
        body: new URLSearchParams({
          client_id: client_id,
          client_secret: client_secret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      })

      const result = await twitchTokenResponse.json();
      return result
    } catch (error: any) {
      console.log(error)
      return error;
    }
  }
}
