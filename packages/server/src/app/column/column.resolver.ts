import {
    Resolver,
    FieldResolver,
    Root,
    Ctx,
    Mutation,
    Authorized,
    Arg,
} from "type-graphql";
import { Types } from "mongoose";
import { Column } from "./column.schema";
import { Issue } from "../issue/issue.schema";
import { AppContext } from "../../utils/schema/context";
import { ColumnService } from "./column.service";
import { RearrangeIssueFindInput, RearrangeIssueInput } from "./column.dto";

@Resolver(() => Column)
export class ColumnResolver {
    constructor(private columnService: ColumnService) {}

    @FieldResolver(() => [Issue], {
        nullable: "items",
    })
    issues(
        @Ctx() ctx: AppContext,
        @Root() { issueIDs = [] }: Column
    ): Promise<(Issue | Error)[]> {
        return ctx.issueLoader.loadMany(issueIDs as Types.ObjectId[]);
    }

    @Authorized()
    @Mutation(() => Boolean)
    rearrangeIssue(
        @Arg("where") where: RearrangeIssueFindInput,
        @Arg("data") data: RearrangeIssueInput
    ): Promise<boolean> {
        return this.columnService.rearrangeIssue(where, data);
    }
}
