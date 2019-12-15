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
import { ProjectService } from "./project.service";
import { User, AuthRolesEnum } from "../user/user.schema";
import { Context } from "../../network/context";
import { Column } from "../column/column.schema";
import {
    FindInput,
    TitleAndDescSchema,
    RearrangeColumnInput,
    ColumnIDInput,
    Filters,
} from "../shared/shared.schema";
import { ConnectionArgsType } from "../../utils/schema/connection";

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
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => ProjectConnection)
    async projectConnections(
        @Ctx() ctx: Context,
        @Args() args: ConnectionArgsType,
        @Arg("filters") filters: Filters
    ) {
        return new ProjectService(ctx).filters(filters).paginated(args);
    }
}

@Resolver(() => Project)
export class ProjectResolver {
    // Field Resolvers ==========================================================
    @FieldResolver(() => User)
    async createdBy(
        @Ctx() ctx: Context,
        @Root() { userID }: Project
    ): Promise<User> {
        return ctx.userLoader.load(userID as Types.ObjectId);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @FieldResolver(() => [Column])
    async columns(
        @Ctx() ctx: Context,
        @Root() { columnIDs }: Project
    ): Promise<(Column | Error)[]> {
        return ctx.columnLoader.loadMany(columnIDs as Types.ObjectId[]);
    }

    // Resolvers ==========================================================
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Project], {
        nullable: "items",
    })
    async projects(
        @Ctx() ctx: Context,
        @Arg("filters") filters: Filters
    ): Promise<Project[]> {
        return new ProjectService(ctx).filters(filters).projects();
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Project, {
        nullable: true,
    })
    async project(
        @Ctx() ctx: Context,
        @Arg("where") { _id }: FindInput
    ): Promise<Project> {
        return new ProjectService(ctx).project(_id);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Project)
    async createProject(
        @Ctx() ctx: Context,
        @Arg("data") data: CreateProjectInput
    ): Promise<Project> {
        return new ProjectService(ctx).createProject(data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean)
    async rearrangeColumn(
        @Ctx() ctx: Context,
        @Arg("where") where: RearrangeColumnFindInput,
        @Arg("data") data: RearrangeColumnInput
    ): Promise<boolean> {
        return new ProjectService(ctx).rearrangeColumn(where, data);
    }
}
