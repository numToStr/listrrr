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
    Info,
    Args,
} from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { Types } from "mongoose";
import { Issue, IssueConnection } from "./issue.schema";
import { IssueService } from "./issue.service";
import { Project } from "../project/project.schema";
import {
    FindInput,
    TitleAndDescSchema,
    Filters,
} from "../shared/shared.schema";
import { Context } from "../../network/context";
import { AuthRolesEnum, User } from "../user/user.schema";
import { ConnectionArgsType } from "../../utils/schema/connection";

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

@Resolver(() => IssueConnection)
export class IssueConnectionResolver {
    // Field Resolvers ==========================================================
    @FieldResolver(() => Number)
    closedCount(@Ctx() ctx: Context, @Info() info: GraphQLResolveInfo) {
        return new IssueService(ctx, info).closedCount();
    }

    @FieldResolver(() => Number)
    openCount(@Ctx() ctx: Context, @Info() info: GraphQLResolveInfo) {
        return new IssueService(ctx, info).openCount();
    }

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => IssueConnection)
    async issueConnection(
        @Ctx() ctx: Context,
        @Info() info: GraphQLResolveInfo,
        @Args() args: ConnectionArgsType,
        @Arg("filters") filters: Filters
    ) {
        return new IssueService(ctx, info).filters(filters).paginated(args);
    }
}

@Resolver(() => Issue)
export class IssueResolver {
    // Field Resolvers ==========================================================
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

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Issue], {
        nullable: "items",
    })
    async issues(
        @Ctx() ctx: Context,
        @Info() info: GraphQLResolveInfo,
        @Arg("filters") filters: Filters
    ): Promise<Issue[]> {
        return new IssueService(ctx, info).filters(filters).issues();
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Issue, {
        nullable: true,
    })
    async issue(
        @Ctx() ctx: Context,
        @Info() info: GraphQLResolveInfo,
        @Arg("where") { _id }: FindInput
    ): Promise<Issue> {
        return new IssueService(ctx, info).issue(_id);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue)
    async createIssue(
        @Ctx() ctx: Context,
        @Info() info: GraphQLResolveInfo,
        @Arg("data") data: CreateIssueInput
    ): Promise<Issue> {
        return new IssueService(ctx, info).createIssue(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    async updateIssueProjects(
        @Ctx() ctx: Context,
        @Info() info: GraphQLResolveInfo,
        @Arg("where") where: FindInput,
        @Arg("data") data: UpdateIssueProjectInput
    ): Promise<Issue> {
        return new IssueService(ctx, info).updateIssueProjects(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    async deleteIssue(
        @Ctx() ctx: Context,
        @Info() info: GraphQLResolveInfo,
        @Arg("where") where: FindInput
    ): Promise<Issue> {
        return new IssueService(ctx, info).deleteIssue(where);
    }
}
