import {
    Query,
    Resolver,
    FieldResolver,
    Root,
    Arg,
    Ctx,
    Authorized,
} from "type-graphql";
import { Types } from "mongoose";
import { Issue } from "./issue.schema";
import { IssueService } from "./issue.service";
import { ProjectService } from "../project/project.service";
import { Project } from "../project/project.schema";
import { FindInput } from "../../utils/schema/schema";
import { Context } from "../../network/context";
import { AuthRolesEnum } from "../user/user.schema";

@Resolver(() => Issue)
export class IssueResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Issue], {
        nullable: "items",
    })
    issues(): Promise<Issue[]> {
        return new IssueService().issues();
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Issue, {
        nullable: true,
    })
    issue(@Arg("where") { _id }: FindInput) {
        return new IssueService().issue(_id);
    }

    @FieldResolver(() => Project)
    project(
        @Root() { projectID }: Issue,
        @Ctx() ctx: Context
    ): Promise<Project> {
        return new ProjectService(ctx).project(projectID as Types.ObjectId);
    }
}
