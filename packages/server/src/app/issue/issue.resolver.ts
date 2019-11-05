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
import { FindInput, TitleAndDescSchema } from "../../utils/schema/schema";
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
        return ctx.userLoader.load(userID as Types.ObjectId);
    }

    @FieldResolver(() => Project)
    projects(
        @Root() { projectIDs }: Issue,
        @Ctx() ctx: Context
    ): Promise<Project[]> {
        return ctx.projectLoader.loadMany(projectIDs as Array<Types.ObjectId>);
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
    updateIssueProjects(
        @Ctx() ctx: Context,
        @Arg("where") where: FindInput,
        @Arg("data") data: UpdateIssueProjectInput
    ) {
        return new IssueService(ctx).updateIssueProjects(where, data);
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
