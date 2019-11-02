import { Resolver, FieldResolver, Root } from "type-graphql";
import { Types } from "mongoose";
import { Column } from "./column.schema";
import { ColumnService } from "./column.service";
import { Issue } from "../issue/issue.schema";

@Resolver(() => Column)
export class ColumnResolver {
    @FieldResolver(() => [Issue], {
        nullable: "items",
    })
    issues(@Root() { issueIDs }: Column): Promise<Issue[]> {
        return new ColumnService().issues(issueIDs as Types.ObjectId[]);
    }
}
