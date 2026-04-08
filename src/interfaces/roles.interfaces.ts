import { HttpStatus } from "@nestjs/common";

export type IRole = {
    role_id: string;
    role_name: string;
}

export interface RoleResponse {
    message: string,
    data: IRole,
    status: HttpStatus
}

export interface RolesResponse {
    message: string,
    data: IRole[],
    status: HttpStatus
}