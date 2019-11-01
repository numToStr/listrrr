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
} from "type-graphql";
import { Types } from "mongoose";
import { Project } from "./project.schema";
import { ProjectService } from "./project.service";
import { User, AuthRolesEnum } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { Context } from "../../network/context";
import { Column } from "../column/column.schema";
import { ColumnService } from "../column/column.service";
import { FindInput, TitleAndDescSchema } from "../../utils/schema/schema";

@InputType()
export class CreateProjectInput extends TitleAndDescSchema {
    @Field({
        description: `Template ID for the project`,
    })
    templateID: Types.ObjectId;
}

@Resolver(() => Project)
export class ProjectResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Project], {
        nullable: "items",
    })
    projects(@Ctx() ctx: Context): Promise<Project[]> {
        return new ProjectService(ctx).projects();
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => Project, {
        nullable: true,
    })
    project(@Ctx() ctx: Context, @Arg("where") { _id }: FindInput) {
        return new ProjectService(ctx).project(_id);
    }

    @FieldResolver(() => User)
    createdBy(@Ctx() ctx: Context, @Root() { userID }: Project): Promise<User> {
        return new UserService(ctx).createdBy(userID as Types.ObjectId);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @FieldResolver(() => [Column])
    columns(@Root() { columnsID }: Project): Promise<Column[]> {
        return new ColumnService().columns(columnsID as Types.ObjectId);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Project)
    createProject(@Ctx() ctx: Context, @Arg("data") data: CreateProjectInput) {
        return new ProjectService(ctx).createProject(data);
    }
}
