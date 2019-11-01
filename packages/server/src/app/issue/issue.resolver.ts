import { Query, Resolver, FieldResolver, Root, Arg } from "type-graphql";
import { Types } from "mongoose";
import { Issue } from "./issue.schema";
import { IssueService } from "./issue.service";
import { ProjectService } from "../project/project.service";
import { Project } from "../project/project.schema";
import { FindInput } from "../../utils/schema/schema";

@Resolver(() => Issue)
export class IssueResolver {
    @Query(() => [Issue], {
        nullable: "items",
    })
    issues(): Promise<Issue[]> {
        return new IssueService().issues();
    }

    @Query(() => Issue, {
        nullable: true,
    })
    issue(@Arg("where") { _id }: FindInput) {
        return new IssueService().issue(_id);
    }

    @FieldResolver(() => Project)
    project(@Root() { projectID }: Issue): Promise<Project> {
        return new ProjectService().project(projectID as Types.ObjectId);
    }
}
