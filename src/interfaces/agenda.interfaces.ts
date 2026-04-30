import { HttpStatus } from "@nestjs/common";

export interface IAgenda {
    user_id: string;
    day_id: string;
    hour_id: string;
}

export interface AgendaResponse {
    message: string;
    data: IAgenda;
    status: HttpStatus;
}

export interface AgendasResponse {
    message: string;
    data: IAgenda[];
    status: HttpStatus;
}

export interface SearchLiveStreams {
  group_id: string;
  day_name: string;
  hour_name: string;
}