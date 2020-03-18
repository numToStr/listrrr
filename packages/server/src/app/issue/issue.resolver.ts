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
    Args,
} from "type-graphql";
import { Types } from "mongoose";
import { Issue, IssueConnection } from "./issue.schema";
import { Project } from "../project/project.schema";
import {
    FindInput,
    TitleAndDescSchema,
    Filters,
} from "../shared/shared.schema";
import { AppContext } from "../../utils/schema/context";
import { AuthRolesEnum, User } from "../user/user.schema";
import { ConnectionArgsType } from "../../utils/schema/connection";
import { IssueService } from "./issue.service";
import { Selections } from "../../utils/decorator/selections.decorator";
import { MongoSelectionSet } from "../../@types/types";

// Used for getting mongo select
// by parsing GQL AST
const aliases = {
    // Graphql Field : Database Field
    createdBy: "userID",
    projects: "projectIDs",
};

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
    constructor(private issueService: IssueService) {}

    // Field Resolvers ==========================================================
    @FieldResolver(() => Number)
    closedCount() {
        return this.issueService.closedCount();
    }

    @FieldResolver(() => Number)
    openCount() {
        return this.issueService.openCount();
    }

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => IssueConnection)
    issueConnection(
        @Selections(aliases) select: MongoSelectionSet,
        @Args() args: ConnectionArgsType,
        @Arg("filters") filters: Filters
    ) {
        return this.issueService.paginated(args, select, filters);
    }
}

@Resolver(() => Issue)
export class IssueResolver {
    constructor(private issueService: IssueService) {}

    // Field Resolvers ==========================================================
    @FieldResolver(() => User)
    createdBy(
        @Ctx() ctx: AppContext,
        @Root() { userID }: Project
    ): Promise<User> {
        return ctx.userLoader.load(userID as Types.ObjectId);
    }

    @FieldResolver(() => Project)
    projects(
        @Root() { projectIDs }: Issue,
        @Ctx() ctx: AppContext
    ): Promise<(Project | Error)[]> {
        return ctx.projectLoader.loadMany(projectIDs as Array<Types.ObjectId>);
    }

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Issue], {
        nullable: "items",
    })
    issues(
        @Selections(aliases) select: MongoSelectionSet,
        @Arg("filters") filters: Filters
    ): Promise<Issue[]> {
        return this.issueService.issues(select, filters);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Issue, {
        nullable: true,
    })
    issue(
        @Selections(aliases) select: MongoSelectionSet,
        @Arg("where") { _id }: FindInput
    ): Promise<Issue> {
        return this.issueService.issue(_id, select);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue)
    createIssue(@Arg("data") data: CreateIssueInput): Promise<Issue> {
        return this.issueService.createIssue(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean)
    updateIssueProjects(
        @Arg("where") where: FindInput,
        @Arg("data") data: UpdateIssueProjectInput
    ): Promise<boolean> {
        return this.issueService.updateIssueProjects(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Issue, {
        nullable: true,
    })
    deleteIssue(@Arg("where") where: FindInput): Promise<Issue> {
        return this.issueService.deleteIssue(where);
    }
}
