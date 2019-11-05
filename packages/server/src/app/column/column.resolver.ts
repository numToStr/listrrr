import { Resolver, FieldResolver, Root, Ctx } from "type-graphql";
import { Types } from "mongoose";
import { Column } from "./column.schema";
import { Issue } from "../issue/issue.schema";
import { Context } from "../../network/context";

@Resolver(() => Column)
export class ColumnResolver {
    @FieldResolver(() => [Issue], {
        nullable: "items",
    })
    issues(
        @Ctx() ctx: Context,
        @Root() { issueIDs }: Column
    ): Promise<Issue[]> {
        return ctx.issueLoader.loadMany(issueIDs as Types.ObjectId[]);
    }
}
