import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @IsNotEmpty({ message: 'El nombre del rol no debe ir vacío' })
    @IsString({ message: 'El nombre del rol debe ser un texto' })
    role_name: string;

}
