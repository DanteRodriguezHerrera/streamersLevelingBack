import { HttpStatus } from "@nestjs/common";

export type IDay = {
    day_id: string;
    day_name: string;
}

export interface DayResponse {
    message: string;
    data: IDay;
    status: HttpStatus
}

export interface DaysResponse {
    message: string;
    data: IDay[];
    status: HttpStatus
}