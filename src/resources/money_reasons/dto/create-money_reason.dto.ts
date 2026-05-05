import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMoneyReasonDto {

    @IsNotEmpty({ message: 'La cantidad no debe ir vacía' })
    @IsNumber({}, {message: 'La cantidad debe ser un numero'})
    quantity: number;

    @IsNotEmpty({ message: 'La razón no debe ir vacía'})
    @IsNumber({}, { message: 'La razón debe ser un numero'})
    reason: number;

    @IsNotEmpty({ message: 'La descripción no debe estar vacía' })
    @IsString({ message: 'La descripción debe ser un texto' })
    description: string;

}
