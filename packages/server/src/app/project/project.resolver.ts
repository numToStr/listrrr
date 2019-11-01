import { Query, Resolver, FieldResolver, Ctx, Root, Arg } from "type-graphql";
import { Types } from "mongoose";
import { Project } from "./project.schema";
import { ProjectService } from "./project.service";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { Context } from "../../network/context";
import { Column } from "../column/column.schema";
import { ColumnService } from "../column/column.service";
import { IDSchema } from "../../utils/schema/schema";

@Resolver(() => Project)
export class ProjectResolver {
    @Query(() => [Project], {
        nullable: "items",
    })
    projects(): Promise<Project[]> {
        return new ProjectService().projects();
    }

    @Query(() => Project, {
        nullable: true,
    })
    project(@Arg("where") { _id }: IDSchema) {
        return new ProjectService().project(_id);
    }

    @FieldResolver(() => User)
    createdBy(@Ctx() ctx: Context, @Root() { userID }: Project): Promise<User> {
        return new UserService(ctx).createdBy(userID as Types.ObjectId);
    }

    @FieldResolver(() => [Column])
    columns(@Root() { columnsID }: Project): Promise<Column[]> {
        return new ColumnService().columns(columnsID as Types.ObjectId);
    }
}
