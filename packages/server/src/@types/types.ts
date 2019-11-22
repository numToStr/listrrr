import { Types } from "mongoose";
import { AuthRolesEnum } from "../app/user/user.schema";

export type ErrorHandler = (error: Error | null, event: string) => never;

export interface DALOptions {
    select?: string;
    sort?: object;
    upsert?: boolean;
    arrayFilters?: Array<Record<string, unknown>>;
}

export interface TokenPayload {
    ID: string;
    ROLE: AuthRolesEnum;
}

export type DALQuery = {
    userID: Types.ObjectId;
    _id?: unknown;
};
