import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'El id de Twitch no debe estar vacío' })
    @IsString({ message: 'id de Twitch debe ser un texto.' })
    twitch_id: string;

    @IsNotEmpty({ message: 'El id del rol no debe estar vacío' })
    @IsString({ message: 'El id del rol debe ser un texto.' })
    role_id: string;

    @IsString({ message: 'El id del grupo debe ser un texto.' })
    group_id: string | null;

    @IsNotEmpty({ message: 'El access_token no debe estar vacío' })
    @IsString({ message: 'El access_token debe ser un texto.' })
    access_token: string;

    @IsNotEmpty({ message: 'El expires_in no debe ir vacío' })
    @IsNumber({}, { message: 'El expires_in debe ser un número' })
    expires_in: number;

    @IsNotEmpty({ message: 'El refresh_token no debe estar vacío' })
    @IsString({ message: 'El refresh_token debe ser un número' })
    refresh_token: string;
}
