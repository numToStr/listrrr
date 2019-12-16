import { Types } from "mongoose";
import {
    FieldNode,
    FragmentDefinitionNode,
    InlineFragmentNode,
    GraphQLResolveInfo,
} from "graphql";
import { AuthRolesEnum } from "../app/user/user.schema";

export type ErrorHandler = (error: Error | null, event: string) => never;

export type Aliases = Record<string, string>;
export type MongoSelectionSet = Record<string, boolean>;
export type Nodes = readonly (
    | FieldNode
    | FragmentDefinitionNode
    | InlineFragmentNode
)[];

export type GqlNormalAstMongo = (
    aliases: Aliases,
    gqlAst: GraphQLResolveInfo,
    nodes?: Nodes
) => MongoSelectionSet;

export type GqlAstMongo = (
    aliases: Aliases,
    gqlAst: GraphQLResolveInfo
) => MongoSelectionSet;

export interface DALOptions {
    select?: string | MongoSelectionSet;
    sort?: object;
    upsert?: boolean;
    arrayFilters?: Array<Record<string, unknown>>;
    limit?: number;
    skip?: number;
}

export interface TokenPayload {
    ID: string;
    ROLE: AuthRolesEnum;
}

export type DALQuery = {
    userID: Types.ObjectId;
    _id?: unknown;
};
