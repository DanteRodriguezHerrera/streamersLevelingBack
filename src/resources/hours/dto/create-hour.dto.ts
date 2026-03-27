import { IsNotEmpty, IsString } from "class-validator";

export class CreateHourDto {

    @IsNotEmpty({ message: 'El nombre de la hora no debe ir vacío' })
    @IsString({ message: 'El nombre de la hora debe ser un texto' })
    hour_name: string;
    
}
