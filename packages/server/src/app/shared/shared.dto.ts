import {
    registerEnumType,
    InputType,
    Field,
    createUnionType,
} from "type-graphql";
import { FindInput } from "./shared.schema";
import { Issue } from "../issue/issue.schema";
import { Project } from "../project/project.schema";

export enum EntityType {
    ISSUE = "ISSUE",
    PROJECT = "PROJECT",
}

@InputType()
export class ClosedInput {
    @Field()
    closed: boolean;
}

@InputType()
export class FindEntityInput extends FindInput {
    @Field(() => EntityType)
    type: EntityType;
}

export const Entity = createUnionType({
    name: "EntityUnion",
    types: () => [Issue, Project],
    resolveType: value => {
        if ("templateID" in value) {
            return Project;
        }

        return Issue;
    },
});

registerEnumType(EntityType, {
    name: "EntityType",
    description: "Roles for the authenticated users",
});
