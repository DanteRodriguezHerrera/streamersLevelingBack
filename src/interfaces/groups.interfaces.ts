import { HttpStatus } from "@nestjs/common";

export type IGroup = {
    group_id: string;
    group_name: string;
}

export interface GroupResponse {
    message: string,
    data: IGroup,
    status: HttpStatus
}