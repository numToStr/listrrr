import { AuthRolesEnum } from "../app/user/user.schema";

export type AnyObject = { [key: string]: unknown };

export interface DALOptions {
    select?: string;
    sort?: object;
    upsert?: boolean;
}

export interface TokenPayload {
    ID: string;
    ROLE: AuthRolesEnum;
}
