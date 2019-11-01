import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { Project } from "../project/project.schema";
import { TitleAndDescriptionSchema } from "../../utils/schema/schema";

@ObjectType()
export class Issue extends TitleAndDescriptionSchema {
    @Field()
    @prop({
        default: false,
    })
    closed: boolean;

    @prop({
        required: true,
        ref: User,
    })
    userID: Ref<User>;

    @Field(() => User)
    createdBy: User;

    @prop({
        ref: Project,
    })
    projectID?: Ref<Project>;

    @Field(() => Project, {
        nullable: true,
    })
    project?: Project;
}

export const IssueModel = getModelForClass(Issue);
