import {
    Resolver,
    Authorized,
    Mutation,
    InputType,
    Field,
    Arg,
    createUnionType,
    registerEnumType,
} from "type-graphql";
import { AuthRolesEnum } from "../user/user.schema";
import { Issue } from "../issue/issue.schema";
import { FindInput, TitleAndDescSchema } from "./shared.schema";
import { Project } from "../project/project.schema";
import { SharedService } from "./shared.service";

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

@Resolver()
export class SharedResolver {
    constructor(private sharedService: SharedService) {}

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean, {
        nullable: true,
        description: "For closing/reopening a particular issue/project",
    })
    closeOrOpen(
        @Arg("where") where: FindEntityInput,
        @Arg("data") data: ClosedInput
    ) {
        return this.sharedService.closedOrOpen(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Entity, {
        nullable: true,
        description:
            "For updating title and description of a particular issue/project",
    })
    updateTitleAndDescription(
        @Arg("where") where: FindEntityInput,
        @Arg("data") data: TitleAndDescSchema
    ) {
        return this.sharedService.updateTitleAndDescription(where, data);
    }
}

registerEnumType(EntityType, {
    name: "EntityType",
    description: "Roles for the authenticated users",
});
