import { GraphQLResolveInfo } from "graphql";
import { Types } from "mongoose";
import { AppContext } from "../schema/context";
import { gqlAstToMongoSelect } from "../schema/ast";

export abstract class RootService {
    constructor(
        private readonly ctx: AppContext,
        private readonly info: GraphQLResolveInfo
    ) {}

    protected get ID() {
        return Types.ObjectId(this.ctx.USER.ID);
    }

    protected selections(aliases: Record<string, string> = {}) {
        return gqlAstToMongoSelect(aliases, this.info);
    }
}
