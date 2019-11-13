import {
    Resolver,
    FieldResolver,
    Root,
    Ctx,
    Authorized,
    Mutation,
    Arg,
    InputType,
    Field,
} from "type-graphql";
import { Types } from "mongoose";
import { Column } from "./column.schema";
import { Issue } from "../issue/issue.schema";
import { Context } from "../../network/context";
import { AuthRolesEnum } from "../user/user.schema";
import { FindInput } from "../../utils/schema/schema";
import { ColumnService } from "./column.service";

@InputType()
export class RearrangeColumnInput {
    @Field()
    initialPosition: number;

    @Field()
    finalPosition: number;
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
    @Mutation(() => [Column], {
        nullable: "items",
    })
    rearrangeColumn(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput,
        @Arg("data") data: RearrangeColumnInput
    ) {
        return new ColumnService(ctx).rearrangeColumn(where, data);
    }
}
