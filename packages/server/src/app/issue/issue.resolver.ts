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
import { Project } from "../project/project.schema";
import {
    FindInput,
    TitleAndDescSchema,
    Filters,
} from "../shared/shared.schema";
import { Context } from "../../network/context";
import { AuthRolesEnum, User } from "../user/user.schema";

@InputType()
export class CreateIssueInput extends TitleAndDescSchema {
    @Field(() => [Types.ObjectId], {
        nullable: "items",
        description: `Project IDs for the issue which it belongs`,
    })
    projectIDs: Array<Types.ObjectId>;
}

@InputType()
export class UpdateIssueProjectInput {
    @Field(() => [Types.ObjectId], {
        nullable: "items",
    })
    projectIDs: Array<Types.ObjectId>;
}

@Resolver(() => Issue)
export class IssueResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Issue], {
        nullable: "items",
    })
    async issues(
        @Ctx() ctx: Context,
        @Arg("filters") filters: Filters
    ): Promise<Issue[]> {
        return new IssueService(ctx).issues(filters);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Issue, {
        nullable: true,
    })
    async issue(
        @Ctx() ctx: Context,
        @Arg("where") { _id }: FindInput
    ): Promise<Issue> {
        return new IssueService(ctx).issue(_id);
    }

    @FieldResolver(() => User)
    async createdBy(
        @Ctx() ctx: Context,
        @Root() { userID }: Project
    ): Promise<User> {
        return ctx.userLoader.load(userID as Types.ObjectId);
    }

    @FieldResolver(() => Project)
    async projects(
        @Root() { projectIDs }: Issue,
        @Ctx() ctx: Context
    ): Promise<(Project | Error)[]> {
        return ctx.projectLoader.loadMany(projectIDs as Array<Types.ObjectId>);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue)
    async createIssue(
        @Ctx() ctx: Context,
        @Arg("data") data: CreateIssueInput
    ): Promise<Issue> {
        return new IssueService(ctx).createIssue(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    async updateIssueProjects(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput,
        @Arg("data") data: UpdateIssueProjectInput
    ): Promise<Issue> {
        return new IssueService(ctx).updateIssueProjects(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    async deleteIssue(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput
    ): Promise<Issue> {
        return new IssueService(ctx).deleteIssue(where);
    }
}
