import { Types } from "mongoose";
import {
    FieldNode,
    FragmentDefinitionNode,
    InlineFragmentNode,
    GraphQLResolveInfo,
    FragmentSpreadNode,
} from "graphql";
import { AuthRolesEnum } from "../app/user/user.schema";

export type ErrorHandler = (error: Error | null, event: string) => never;

export type Aliases = Record<string, string>;
export type MongoSelectionSet = Record<string, boolean>;
export type GqlNode =
    | FieldNode
    | FragmentDefinitionNode
    | InlineFragmentNode
    | FragmentSpreadNode;

export type GqlNormalAstMongoSelect = (
    aliases: Aliases,
    gqlAst: GraphQLResolveInfo,
    nodes?: ReadonlyArray<GqlNode>
) => MongoSelectionSet;

export type GqlAstMongoSelect = (
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
