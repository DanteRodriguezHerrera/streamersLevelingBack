import { IsNotEmpty, IsString } from "class-validator";

export class CreateDayDto {

    @IsNotEmpty({ message: 'El nombre del dia no debe estar vacío' })
    @IsString({ message: 'El nombre del dia debe ser un texto'})
    day_name: string;
    
}
