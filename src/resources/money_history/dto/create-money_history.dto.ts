import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMoneyHistoryDto {

    @IsNumber({}, { message: 'La cantidad debe ser un número' })
    @IsNotEmpty({ message: 'La cantidad no debe ir vacía' })
    quantity: number;

    @IsString({ message: 'La razón no debe ir vacía '})
    @IsNotEmpty({ message: 'La razón no debe ir vacía'})
    reason: string;

    @IsString({ message: 'El id del usuario no debe ir vacío' })
    @IsNotEmpty({ message: 'El historial no puede no tener un usuario asociado' })
    user_id: string;
}
