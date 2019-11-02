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
import { AuthRolesEnum } from "../user/user.schema";

@InputType()
export class CreateIssueInput extends TitleAndDescSchema {
    @Field({
        description: `Project ID for the issue which it belongs`,
    })
    projectID: Types.ObjectId;
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
}
