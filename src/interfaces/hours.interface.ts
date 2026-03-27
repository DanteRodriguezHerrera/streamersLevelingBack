import { HttpStatus } from "@nestjs/common";

export type IHour = {
    hour_id: string;
    hour_name: string;
}

export interface HourResponse {
    message: string;
    data: IHour;
    status: HttpStatus
}

export interface HoursResponse {
    message: string;
    data: IHour[];
    status: HttpStatus
}