import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    try {

    } catch (error) {

    }
  }

  async findAll() {
    try {

    } catch (error) {

    }
  }

  async findOne(id: number) {

    //   async getUser() {

    //   const headers = new Headers()

    //   headers.append('Authorization', 'Bearer eu4qifgzg3xy6hyhh8yzmoe29y4tfc')
    //   headers.append('client-Id', 'asbp5fyz7toklrqthtkyk6k4i3w9xe')

    //   const response = await fetch('https://api.twitch.tv/helix/users?id=540725944', { headers: headers })

    //   return await response.json();
    // }

    try {

    } catch (error) {

    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {

    } catch (error) {

    }
  }

  async remove(id: number) {
    try {

    } catch (error) {

    }
  }
}
