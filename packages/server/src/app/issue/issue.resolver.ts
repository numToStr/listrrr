import {
    Query,
    Resolver,
    FieldResolver,
    Root,
    Arg,
    Ctx,
    Authorized,
    InputType,
    Field,
    Mutation,
} from "type-graphql";
import { Types } from "mongoose";
import { Issue } from "./issue.schema";
import { IssueService } from "./issue.service";
import { ProjectService } from "../project/project.service";
import { Project } from "../project/project.schema";
import { FindInput, TitleAndDescSchema } from "../../utils/schema/schema";
import { Context } from "../../network/context";
import { AuthRolesEnum, User } from "../user/user.schema";
import { UserService } from "../user/user.service";

@InputType()
export class CreateIssueInput extends TitleAndDescSchema {
    @Field(() => [Types.ObjectId], {
        nullable: "items",
        description: `Project IDs for the issue which it belongs`,
    })
    projectIDs: Array<Types.ObjectId>;
}

@InputType()
export class ClosedInput {
    @Field()
    closed: boolean;
}

@Resolver(() => Issue)
export class IssueResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Issue], {
        nullable: "items",
    })
    issues(@Ctx() ctx: Context): Promise<Issue[]> {
        return new IssueService(ctx).issues();
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Issue, {
        nullable: true,
    })
    issue(@Ctx() ctx: Context, @Arg("where") { _id }: FindInput) {
        return new IssueService(ctx).issue(_id);
    }

    @FieldResolver(() => User)
    createdBy(@Ctx() ctx: Context, @Root() { userID }: Project): Promise<User> {
        return new UserService(ctx).createdBy(userID as Types.ObjectId);
    }

    @FieldResolver(() => Project)
    projects(
        @Root() { projectIDs }: Issue,
        @Ctx() ctx: Context
    ): Promise<Project[]> {
        return new ProjectService(ctx).projects(projectIDs as Types.ObjectId[]);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue)
    createIssue(@Ctx() ctx: Context, @Arg("data") data: CreateIssueInput) {
        return new IssueService(ctx).createIssue(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    closeOrOpenIssue(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput,
        @Arg("data") data: ClosedInput
    ) {
        return new IssueService(ctx).closeOrOpenIssue(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    updateTitleAndDescription(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput,
        @Arg("data") data: TitleAndDescSchema
    ) {
        return new IssueService(ctx).updateTitleAndDecription(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    deleteIssue(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput
    ): Promise<Issue> {
        return new IssueService(ctx).deleteIssue(where);
    }
}
