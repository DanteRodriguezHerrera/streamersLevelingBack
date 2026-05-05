import { HttpStatus } from "@nestjs/common";

export type MoneyReasonInterface = {
    money_reason_id: string;
    quantity: number;
    reason: number;
    description: string;
}

export interface MoneyReasonResponse {
    message: string;
    data: MoneyReasonInterface;
    status: HttpStatus;
}

export interface MoneyReasonsResponse {
    message: string;
    data: MoneyReasonInterface[];
    status: HttpStatus;
}