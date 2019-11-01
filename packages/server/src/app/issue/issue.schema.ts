import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.schema";
import { Project } from "../project/project.schema";

@ObjectType()
export class Issue {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @prop({
        required: true,
        minlength: 5,
        maxlength: 50,
    })
    title: string;

    @Field()
    @prop({
        required: true,
        minlength: 10,
        maxlength: 200,
    })
    description: string;

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
