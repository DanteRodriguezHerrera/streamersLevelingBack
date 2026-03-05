import { HttpStatus } from "@nestjs/common";

export type IUser = {
    user_id: string;
    twitch_id: string;
    role_id: string;
    group_id: string | null;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    actual_money: number;
}

export interface UserResponse {
    message: string;
    data: IUser;
    status: HttpStatus;
}

export interface UsersResponse {
    message: string;
    data: IUser[];
    status: HttpStatus;
}