export type IUser = {
    user_id: string;
    twitch_id: string;
    role_id: string;
    group_id: string | null;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}