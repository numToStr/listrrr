import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.schema";
import { Project } from "../project/project.schema";
import { TitleAndDescSchema } from "../../utils/schema/schema";

@ObjectType()
export class Issue extends TitleAndDescSchema {
    @Field()
    @prop({
        default: false,
    })
    closed: boolean;

    @prop({
        required: true,
        ref: User,
        index: true,
    })
    userID: Ref<User>;

    @Field(() => User)
    createdBy: User;

    @arrayProp({
        items: Types.ObjectId,
    })
    @prop({
        ref: "Project",
    })
    projectIDs?: Ref<Project>[];

    @Field(() => [Project], {
        nullable: "items",
    })
    projects?: Project[];
}

export const IssueModel = getModelForClass(Issue);
