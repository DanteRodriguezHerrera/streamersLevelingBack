import { IsNotEmpty, IsString } from "class-validator";

export class CreateAgendaDto {

      @IsNotEmpty({ message: 'El id del usuario no debe estar vacío' })
      @IsString({ message: 'El id del usuario debe ser un texto' })
      user_id: string;

      @IsNotEmpty({ message: 'El id del dia no debe estar vacío' })
      @IsString({ message: 'El id del dia debe ser un texto' })
      day_id: string;

      @IsNotEmpty({ message: 'El id del hora no debe estar vacío' })
      @IsString({ message: 'El id del hora debe ser un texto' })
      hour_id: string;
}
