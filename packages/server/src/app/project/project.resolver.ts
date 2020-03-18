import {
    Query,
    Resolver,
    FieldResolver,
    Ctx,
    Root,
    Arg,
    Mutation,
    Field,
    InputType,
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
    TitleAndDescSchema,
    RearrangeColumnInput,
    ColumnIDInput,
    Filters,
} from "../shared/shared.schema";
import { ConnectionArgsType } from "../../utils/schema/connection";
import { ProjectService } from "./project.service";
import { Selections } from "../../utils/decorator/selections.decorator";
import { MongoSelectionSet } from "../../@types/types";

@InputType()
export class CreateProjectInput extends TitleAndDescSchema {
    @Field({
        description: `Template ID for the project`,
    })
    templateID: Types.ObjectId;
}

@InputType()
export class RearrangeColumnFindInput extends ColumnIDInput {
    @Field()
    projectID: Types.ObjectId;
}

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
    async projectConnections(
        @Selections() select: MongoSelectionSet,
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
    async createdBy(
        @Ctx() ctx: AppContext,
        @Root() { userID }: Project
    ): Promise<User> {
        return ctx.userLoader.load(userID as Types.ObjectId);
    }

    @FieldResolver(() => [Column])
    async columns(
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
        @Selections() select: MongoSelectionSet,
        @Arg("filters") filters: Filters
    ): Promise<Project[]> {
        return this.projectSerive.projects(select, filters);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Project, {
        nullable: true,
    })
    async project(
        @Selections() select: MongoSelectionSet,
        @Arg("where") { _id }: FindInput
    ): Promise<Project> {
        return this.projectSerive.project(_id, select);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Project)
    async createProject(
        @Arg("data") data: CreateProjectInput
    ): Promise<Project> {
        return this.projectSerive.createProject(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean)
    async rearrangeColumn(
        @Arg("where") where: RearrangeColumnFindInput,
        @Arg("data") data: RearrangeColumnInput
    ): Promise<boolean> {
        return this.projectSerive.rearrangeColumn(where, data);
    }
}
