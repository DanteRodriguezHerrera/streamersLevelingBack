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

  async getUsersInfo(twitchToken: string, users: string[]) {
    try {
      if(users.length === 0) {
        return {
          message: "No hay streamers en vivo"
        }
      }

      let client_id: string = '';
  
      if(process.env.CLIENT_ID) {
        client_id = process.env.CLIENT_ID;
      }
  
      const url = new URL('https://api.twitch.tv/helix/users');
  
      users.forEach(element => {
        url.searchParams.append('login', element);
      });

      const twitchUsersResponse = await fetch(url, {
        method: "GET",
        headers: new Headers({
          'Client-Id': client_id,
          authorization: `Bearer ${twitchToken}`
        }),
      })

      const result = await twitchUsersResponse.json();
      return result
    } catch (error) {
      console.log(error)
      return error;
    }
  }
}
