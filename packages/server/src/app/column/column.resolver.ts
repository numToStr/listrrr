import {
    Resolver,
    FieldResolver,
    Root,
    Ctx,
    Mutation,
    Authorized,
    InputType,
    Field,
    Arg,
} from "type-graphql";
import { Types } from "mongoose";
import { Column } from "./column.schema";
import { Issue } from "../issue/issue.schema";
import { Context } from "../../network/context";
import { AuthRolesEnum } from "../user/user.schema";
import { ColumnService } from "./column.service";
import { ColumnIDInput, RearrangeColumnInput } from "../shared/shared.schema";

@InputType()
export class RearrangeIssueFindInput extends ColumnIDInput {
    @Field()
    issueID: Types.ObjectId;
}

@InputType()
export class RearrangeIssueInput extends RearrangeColumnInput {
    @Field()
    destinationColumnID: Types.ObjectId;
}

@Resolver(() => Column)
export class ColumnResolver {
    @FieldResolver(() => [Issue], {
        nullable: "items",
    })
    issues(
        @Ctx() ctx: Context,
        @Root() { issueIDs = [] }: Column
    ): Promise<Issue[]> {
        return ctx.issueLoader.loadMany(issueIDs as Types.ObjectId[]);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean)
    rearrangeIssue(
        @Ctx() ctx: Context,
        @Arg("where") where: RearrangeIssueFindInput,
        @Arg("data") data: RearrangeIssueInput
    ) {
        return new ColumnService(ctx).rearrangeIssue(where, data);
    }
}
