import { HttpStatus } from "@nestjs/common";

export type IMoneyHistory = {
    id_money_history: string;
    quantity: number;
    reason: string;
    date_money_history: Date;
    user_id: string;
}

export interface MoneyHistoryResponse {
    message: string,
    data: IMoneyHistory,
    status: HttpStatus
}

export interface MoneyHistoriesResponse {
    message: string,
    data: IMoneyHistory[],
    status: HttpStatus
}