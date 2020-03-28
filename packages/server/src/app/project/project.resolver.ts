import {
    Query,
    Resolver,
    FieldResolver,
    Ctx,
    Root,
    Arg,
    Mutation,
    Authorized,
    Args,
} from "type-graphql";
import { Types } from "mongoose";
import { Project, ProjectConnection } from "./project.schema";
import { User, AuthRolesEnum } from "../user/user.schema";
import { AppContext } from "../../utils/schema/context";
import { Column } from "../column/column.schema";
import {
    FindInput,
    RearrangeColumnInput,
    Filters,
} from "../shared/shared.schema";
import { ConnectionArgsType } from "../../utils/schema/connection";
import { ProjectService } from "./project.service";
import { Selections } from "../../utils/decorator/selections.decorator";
import { MongoSelectionSet } from "../../@types/types";
import { RearrangeColumnFindInput, CreateProjectInput } from "./project.dto";

const aliases = {
    createdBy: "userID",
    columns: "columnIDs",
};

@Resolver(() => ProjectConnection)
export class ProjectConnectionResolver {
    constructor(private projectService: ProjectService) {}

    // Field Resolvers ==========================================================
    @FieldResolver(() => Number)
    closedCount() {
        return this.projectService.closedCount();
    }

    @FieldResolver(() => Number)
    openCount() {
        return this.projectService.openCount();
    }

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => ProjectConnection)
    projectConnections(
        @Selections(aliases) select: MongoSelectionSet,
        @Args() args: ConnectionArgsType,
        @Arg("filters") filters: Filters
    ) {
        return this.projectService.paginated(args, select, filters);
    }
}

@Resolver(() => Project)
export class ProjectResolver {
    constructor(private projectSerive: ProjectService) {}

    // Field Resolvers ==========================================================
    @FieldResolver(() => User)
    createdBy(
        @Ctx() ctx: AppContext,
        @Root() { userID }: Project
    ): Promise<User> {
        return ctx.userLoader.load(userID as Types.ObjectId);
    }

    @FieldResolver(() => [Column])
    columns(
        @Ctx() ctx: AppContext,
        @Root() { columnIDs }: Project
    ): Promise<(Column | Error)[]> {
        return ctx.columnLoader.loadMany(columnIDs as Types.ObjectId[]);
    }

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Project], {
        nullable: "items",
    })
    projects(
        @Selections(aliases) select: MongoSelectionSet,
        @Arg("filters") filters: Filters
    ): Promise<Project[]> {
        return this.projectSerive.projects(select, filters);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Project, {
        nullable: true,
    })
    project(
        @Selections(aliases) select: MongoSelectionSet,
        @Arg("where") { _id }: FindInput
    ): Promise<Project> {
        return this.projectSerive.project(_id, select);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Project)
    createProject(@Arg("data") data: CreateProjectInput): Promise<Project> {
        return this.projectSerive.createProject(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean)
    rearrangeColumn(
        @Arg("where") where: RearrangeColumnFindInput,
        @Arg("data") data: RearrangeColumnInput
    ): Promise<boolean> {
        return this.projectSerive.rearrangeColumn(where, data);
    }
}
