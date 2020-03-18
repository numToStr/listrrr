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
import { AppContext } from "../../utils/schema/context";
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
    constructor(private columnService: ColumnService) {}

    @FieldResolver(() => [Issue], {
        nullable: "items",
    })
    async issues(
        @Ctx() ctx: AppContext,
        @Root() { issueIDs = [] }: Column
    ): Promise<(Issue | Error)[]> {
        return ctx.issueLoader.loadMany(issueIDs as Types.ObjectId[]);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean)
    async rearrangeIssue(
        @Arg("where") where: RearrangeIssueFindInput,
        @Arg("data") data: RearrangeIssueInput
    ): Promise<boolean> {
        return this.columnService.rearrangeIssue(where, data);
    }
}
